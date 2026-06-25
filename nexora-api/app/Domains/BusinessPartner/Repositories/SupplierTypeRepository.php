<?php

namespace App\Domains\BusinessPartner\Repositories;

use App\Domains\BusinessPartner\Models\SupplierType;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SupplierTypeRepository extends BaseRepository implements SupplierTypeRepositoryInterface
{
    protected function model(): string
    {
        return SupplierType::class;
    }
}


