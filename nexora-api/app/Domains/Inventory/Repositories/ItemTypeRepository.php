<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\ItemType;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class ItemTypeRepository extends BaseRepository
{
    protected function model(): string
    {
        return ItemType::class;
    }
}


