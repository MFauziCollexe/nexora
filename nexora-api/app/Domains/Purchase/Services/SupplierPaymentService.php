<?php

namespace App\Domains\Purchase\Services;

use App\Domains\Purchase\Models\SupplierPayment;
use App\Domains\Purchase\Repositories\SupplierPaymentRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SupplierPaymentService
{
    public function __construct(
        protected SupplierPaymentRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('payment_no', 'like', "%{$filters['search']}%")
                  ->orWhere('reference_number', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['payment_method'])) {
            $query->where('payment_method', $filters['payment_method']);
        }

        if (!empty($filters['supplier_id'])) {
            $query->where('supplier_id', $filters['supplier_id']);
        }

        if (!empty($filters['date_from'])) {
            $query->whereDate('date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('date', '<=', $filters['date_to']);
        }

        return $query->with('supplier')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?SupplierPayment
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): SupplierPayment
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Supplier Payment not found');
        }
        return $model;
    }

    public function create(array $data): SupplierPayment
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): SupplierPayment
    {
        $model = $this->findOrFail($id);
        return $this->repository->update($model, $data);
    }

    public function delete(int $id): bool
    {
        $model = $this->findOrFail($id);
        return $this->repository->delete($model);
    }
}
