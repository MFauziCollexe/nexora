<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\Warehouse;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class WarehouseRepository extends BaseRepository
{
    protected function model(): string
    {
        return Warehouse::class;
    }
}


