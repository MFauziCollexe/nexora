<?php

namespace App\Domains\BusinessPartner\Repositories;

use App\Domains\BusinessPartner\Models\SupplierCategory;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SupplierCategoryRepository extends BaseRepository implements SupplierCategoryRepositoryInterface
{
    protected function model(): string
    {
        return SupplierCategory::class;
    }
}


