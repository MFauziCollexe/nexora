<?php

namespace App\Domains\Purchase\Services;

use App\Domains\Purchase\Models\Rfq;
use App\Domains\Purchase\Repositories\RfqRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class RfqService
{
    public function __construct(
        protected RfqRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('rfq_no', 'like', "%{$filters['search']}%")
                  ->orWhere('title', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
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

        return $query->with('requester')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?Rfq
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): Rfq
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('RFQ not found');
        }
        return $model;
    }

    public function create(array $data): Rfq
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): Rfq
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
