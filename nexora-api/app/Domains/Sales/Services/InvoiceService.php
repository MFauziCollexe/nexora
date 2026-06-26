<?php

namespace App\Domains\Sales\Services;

use App\Domains\Sales\Repositories\InvoiceRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;

class InvoiceService
{
    public function __construct(
        protected InvoiceRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('invoice_no', 'like', "%{$filters['search']}%")
                  ->orWhere('customer_name', 'like', "%{$filters['search']}%")
                  ->orWhere('so_no', 'like', "%{$filters['search']}%");
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

    public function findOrFail(int $id): Invoice
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Invoice not found');
        }
        return $model;
    }

    public function create(array $data): Invoice
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): Invoice
    {
        $model = $this->findOrFail($id);
        return $this->repository->update($model, $data);
    }

    public function delete(int $id): bool
    {
        $model = $this->findOrFail($id);
        return $this->repository->delete($model);
    }

    public function reportSummary(array $filters = []): array
    {
        $query = $this->repository->query();

        if (!empty($filters['date_from'])) {
            $query->whereDate('date', '>=', $filters['date_from']);
        }
        if (!empty($filters['date_to'])) {
            $query->whereDate('date', '<=', $filters['date_to']);
        }

        $totalAmount = (float) $query->sum('total_amount');
        $totalPaid = (float) $query->sum('paid_amount');
        $totalOutstanding = (float) $query->sum('outstanding');
        $count = $query->count();

        return compact('totalAmount', 'totalPaid', 'totalOutstanding', 'count');
    }

    public function customerReport(array $filters = []): array
    {
        $query = $this->repository->query();

        if (!empty($filters['date_from'])) {
            $query->whereDate('date', '>=', $filters['date_from']);
        }
        if (!empty($filters['date_to'])) {
            $query->whereDate('date', '<=', $filters['date_to']);
        }

        return $query->selectRaw("
            customer_id, customer_name,
            COUNT(*) as total_invoices,
            SUM(total_amount) as total_amount,
            SUM(paid_amount) as total_paid,
            SUM(outstanding) as total_outstanding,
            MAX(date) as last_invoice
        ")->groupBy('customer_id', 'customer_name')->orderBy('total_amount', 'desc')->get()->toArray();
    }

    public function outstandingReport(array $filters = []): array
    {
        $query = $this->repository->query()->whereIn('status', ['Unpaid', 'Partial', 'Overdue']);

        if (!empty($filters['date_from'])) {
            $query->whereDate('date', '>=', $filters['date_from']);
        }
        if (!empty($filters['date_to'])) {
            $query->whereDate('date', '<=', $filters['date_to']);
        }
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (!empty($filters['customer_id'])) {
            $query->where('customer_id', $filters['customer_id']);
        }

        return $query->with('customer')->orderBy('due_date', 'asc')->get()->toArray();
    }
}
