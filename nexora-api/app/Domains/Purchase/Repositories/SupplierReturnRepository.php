<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\SupplierReturn;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SupplierReturnRepository extends BaseRepository implements SupplierReturnRepositoryInterface
{
    protected function model(): string
    {
        return SupplierReturn::class;
    }
}
