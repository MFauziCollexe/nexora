<?php

namespace App\Domains\Sales\Services;

use App\Domains\Sales\Models\SalesOrder;
use App\Domains\Sales\Repositories\SalesOrderRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class SalesOrderService
{
    public function __construct(
        protected SalesOrderRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('so_no', 'like', "%{$filters['search']}%")
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

        return $query->with('items')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function findOrFail(int $id): SalesOrder
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Sales Order not found');
        }
        return $model;
    }

    public function create(array $data): SalesOrder
    {
        return DB::transaction(function () use ($data) {
            $items = $data['items'] ?? [];
            unset($data['items']);

            $salesOrder = $this->repository->create($data);

            foreach ($items as $item) {
                $salesOrder->items()->create([
                    'item_id' => $item['item_id'] ?? null,
                    'item_name' => $item['item_name'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['subtotal'] ?? ($item['quantity'] * $item['unit_price']),
                ]);
            }

            return $salesOrder;
        });
    }

    public function update(int $id, array $data): SalesOrder
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
}
