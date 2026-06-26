<?php

namespace App\Domains\Sales\Services;

use App\Domains\Sales\Models\Quotation;
use App\Domains\Sales\Models\SalesOrder;
use App\Domains\Sales\Models\SalesOrderItem;
use App\Domains\Sales\Repositories\QuotationRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class QuotationService
{
    public function __construct(
        protected QuotationRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('quotation_no', 'like', "%{$filters['search']}%")
                  ->orWhere('customer_name', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['customer_id'])) {
            $query->where('customer_id', $filters['customer_id']);
        }

        if (!empty($filters['date_from'])) {
            $query->whereDate('date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('date', '<=', $filters['date_to']);
        }

        return $query->with('salesPerson')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?Quotation
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): Quotation
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Quotation not found');
        }
        return $model;
    }

    public function create(array $data): Quotation
    {
        return DB::transaction(function () use ($data) {
            $items = $data['items'] ?? [];
            unset($data['items']);

            $quotation = $this->repository->create($data);

            foreach ($items as $item) {
                $quotation->items()->create([
                    'item_id' => $item['item_id'] ?? null,
                    'item_name' => $item['item_name'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['subtotal'] ?? ($item['quantity'] * $item['unit_price']),
                ]);
            }

            return $quotation;
        });
    }

    public function update(int $id, array $data): Quotation
    {
        return DB::transaction(function () use ($id, $data) {
            $model = $this->findOrFail($id);

            $items = $data['items'] ?? null;
            unset($data['items']);

            $model = $this->repository->update($model, $data);

            if ($items !== null) {
                $model->items()->delete();
                foreach ($items as $item) {
                    $model->items()->create([
                        'item_id' => $item['item_id'] ?? null,
                        'item_name' => $item['item_name'],
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price'],
                        'subtotal' => $item['subtotal'] ?? ($item['quantity'] * $item['unit_price']),
                    ]);
                }
            }

            return $model;
        });
    }

    public function delete(int $id): bool
    {
        $model = $this->findOrFail($id);
        return $this->repository->delete($model);
    }

    public function convertToSo(int $id, array $extra = []): SalesOrder
    {
        $quotation = $this->findOrFail($id);
        $quotation->load('items');

        if ($quotation->status !== 'Open') {
            throw new \RuntimeException('Only Open quotations can be converted to Sales Order');
        }

        return DB::transaction(function () use ($quotation, $extra) {
            $soNo = $extra['so_no'] ?? $this->generateSoNo();

            $salesOrder = SalesOrder::create([
                'so_no' => $soNo,
                'date' => $extra['date'] ?? now()->format('Y-m-d'),
                'customer_id' => $quotation->customer_id,
                'customer_name' => $quotation->customer_name,
                'quotation_id' => $quotation->id,
                'total_amount' => $quotation->total_amount,
                'status' => 'Draft',
                'notes' => $extra['notes'] ?? sprintf('Sales order based on quotation %s', $quotation->quotation_no),
                'sales_person_id' => $quotation->sales_person_id,
                'created_by' => $extra['created_by'] ?? $quotation->created_by,
            ]);

            foreach ($quotation->items as $item) {
                SalesOrderItem::create([
                    'sales_order_id' => $salesOrder->id,
                    'item_id' => $item->item_id,
                    'item_name' => $item->item_name,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'subtotal' => $item->subtotal,
                ]);
            }

            $quotation->update(['status' => 'Converted']);

            return $salesOrder;
        });
    }

    protected function generateSoNo(): string
    {
        $prefix = 'SO-' . date('Y') . '-';
        $last = SalesOrder::where('so_no', 'like', $prefix . '%')
            ->orderBy('so_no', 'desc')
            ->value('so_no');

        if ($last) {
            $num = (int) substr($last, strlen($prefix)) + 1;
        } else {
            $num = 1;
        }

        return $prefix . str_pad((string) $num, 6, '0', STR_PAD_LEFT);
    }
}
