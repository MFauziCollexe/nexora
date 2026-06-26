<?php

namespace App\Domains\Purchase\Services;

use App\Domains\Purchase\Models\VendorEvaluation;
use App\Domains\Purchase\Repositories\VendorEvaluationRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class VendorEvaluationService
{
    public function __construct(
        protected VendorEvaluationRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('evaluation_no', 'like', "%{$filters['search']}%")
                  ->orWhere('period', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['rating'])) {
            $query->where('rating', $filters['rating']);
        }

        if (!empty($filters['supplier_id'])) {
            $query->where('supplier_id', $filters['supplier_id']);
        }

        return $query->with('supplier', 'evaluator')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?VendorEvaluation
    {
        return $this->repository->find($id);
    }

    public function findOrFail(int $id): VendorEvaluation
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Vendor Evaluation not found');
        }
        return $model;
    }

    public function create(array $data): VendorEvaluation
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): VendorEvaluation
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
