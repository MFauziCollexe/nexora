<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\Item;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class ItemRepository extends BaseRepository
{
    protected function model(): string
    {
        return Item::class;
    }
}


