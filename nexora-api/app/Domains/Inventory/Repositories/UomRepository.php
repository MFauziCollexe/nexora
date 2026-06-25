<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\Uom;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class UomRepository extends BaseRepository
{
    protected function model(): string
    {
        return Uom::class;
    }
}


