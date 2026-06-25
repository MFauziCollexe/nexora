<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\BinLocation;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class BinLocationRepository extends BaseRepository implements BinLocationRepositoryInterface
{
    protected function model(): string
    {
        return BinLocation::class;
    }
}


