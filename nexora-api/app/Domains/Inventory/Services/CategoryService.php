<?php

namespace App\Domains\Inventory\Services;

use App\Domains\Inventory\Repositories\CategoryRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class CategoryService
{
    public function __construct(
        protected CategoryRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['search']}%")
                  ->orWhere('code', 'like', "%{$filters['search']}%");
            });
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

    public function find(int $id): ?\App\Domains\Inventory\Models\Category
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): \App\Domains\Inventory\Models\Category
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Category not found');
        }
        return $model;
    }

    public function create(array $data): \App\Domains\Inventory\Models\Category
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): \App\Domains\Inventory\Models\Category
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