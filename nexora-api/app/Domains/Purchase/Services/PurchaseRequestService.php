<?php

namespace App\Domains\Purchase\Services;

use App\Domains\Purchase\Repositories\PurchaseRequestRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class PurchaseRequestService
{
    public function __construct(
        protected PurchaseRequestRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('pr_no', 'like', "%{$filters['search']}%")
                  ->orWhere('department', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (!empty($filters['department'])) {
            $query->where('department', $filters['department']);
        }

        if (!empty($filters['date_from'])) {
            $query->whereDate('date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('date', '<=', $filters['date_to']);
        }

        return $query->with('requester')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?PurchaseRequest
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): PurchaseRequest
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Purchase Request not found');
        }
        return $model;
    }

    public function create(array $data): PurchaseRequest
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): PurchaseRequest
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
