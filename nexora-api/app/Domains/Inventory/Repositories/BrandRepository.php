<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\Brand;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class BrandRepository extends BaseRepository implements BrandRepositoryInterface
{
    protected function model(): string
    {
        return Brand::class;
    }
}


