<?php

namespace Shared\Contracts\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface RepositoryInterface
{
    public function query(): Builder;

    public function all(array $columns = ['*']): Collection;

    public function paginate(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator;

    public function find(int|string $id, array $columns = ['*']): ?Model;

    public function findOrFail(int|string $id, array $columns = ['*']): Model;

    public function findBy(string $field, mixed $value, array $columns = ['*']): ?Model;

    public function getBy(string $field, mixed $value, array $columns = ['*']): Collection;

    public function create(array $data): Model;

    public function update(Model $model, array $data): Model;

    public function updateById(int|string $id, array $data): Model;

    public function delete(Model $model): bool;

    public function deleteById(int|string $id): bool;

    public function count(): int;

    public function exists(string $field, mixed $value): bool;
}
