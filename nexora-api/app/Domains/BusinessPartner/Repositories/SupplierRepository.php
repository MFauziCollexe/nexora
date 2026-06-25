<?php

namespace App\Domains\BusinessPartner\Repositories;

use App\Domains\BusinessPartner\Models\Supplier;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SupplierRepository extends BaseRepository implements SupplierRepositoryInterface
{
    protected function model(): string
    {
        return Supplier::class;
    }
}


