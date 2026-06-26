<?php

namespace App\Domains\Sales\Services;

use App\Domains\Sales\Models\CreditNote;
use App\Domains\Sales\Repositories\CreditNoteRepository;
use Shared\Infrastructure\Exceptions\NotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;

class CreditNoteService
{
    public function __construct(
        protected CreditNoteRepository $repository
    ) {}

    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->repository->query();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('credit_note_no', 'like', "%{$filters['search']}%")
                  ->orWhere('customer_name', 'like', "%{$filters['search']}%")
                  ->orWhere('invoice_no', 'like', "%{$filters['search']}%");
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

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function findOrFail(int $id): CreditNote
    {
        $model = $this->repository->find($id);
        if (!$model) {
            throw new NotFoundException('Credit Note not found');
        }
        return $model;
    }

    public function create(array $data): CreditNote
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): CreditNote
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
