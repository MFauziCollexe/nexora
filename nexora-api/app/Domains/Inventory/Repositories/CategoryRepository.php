<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\Category;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    protected function model(): string
    {
        return Category::class;
    }
}


