<?php

namespace App\Domains\Asset\Repositories;

use App\Domains\Asset\Models\AssetLocation;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class AssetLocationRepository extends BaseRepository implements AssetLocationRepositoryInterface
{
    protected function model(): string
    {
        return AssetLocation::class;
    }
}


