<?php

namespace App\Domains\Inventory\Services;

use App\Domains\Inventory\Repositories\SerialNumberRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SerialNumberService
{
    public function __construct(
        protected SerialNumberRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query()->with('item');

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('serial_number', 'like', "%{$filters['search']}%")
                  ->orWhere('warehouse', 'like', "%{$filters['search']}%")
                  ->orWhere('notes', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['item_id'])) {
            $query->where('item_id', $filters['item_id']);
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        return $query->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?\App\Domains\Inventory\Models\SerialNumber
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): \App\Domains\Inventory\Models\SerialNumber
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Serial Number not found');
        }
        return $model;
    }

    public function create(array $data): \App\Domains\Inventory\Models\SerialNumber
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): \App\Domains\Inventory\Models\SerialNumber
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
