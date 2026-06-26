<?php

namespace App\Domains\Purchase\Services;

use App\Domains\Purchase\Models\ApprovedVendor;
use App\Domains\Purchase\Repositories\ApprovedVendorRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ApprovedVendorService
{
    public function __construct(
        protected ApprovedVendorRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('vendor_code', 'like', "%{$filters['search']}%")
                  ->orWhere('category', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['approval_status'])) {
            $query->where('approval_status', $filters['approval_status']);
        }

        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        return $query->with('supplier')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?ApprovedVendor
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): ApprovedVendor
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Approved Vendor not found');
        }
        return $model;
    }

    public function create(array $data): ApprovedVendor
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): ApprovedVendor
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
