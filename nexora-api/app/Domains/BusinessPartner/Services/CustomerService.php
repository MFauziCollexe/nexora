<?php

namespace App\Domains\BusinessPartner\Services;

use App\Domains\BusinessPartner\Repositories\CustomerRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class CustomerService
{
    public function __construct(
        protected CustomerRepository $repository
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

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?\App\Domains\BusinessPartner\Models\Customer
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): \App\Domains\BusinessPartner\Models\Customer
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Customer not found');
        }
        return $model;
    }

    public function create(array $data): \App\Domains\BusinessPartner\Models\Customer
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): \App\Domains\BusinessPartner\Models\Customer
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