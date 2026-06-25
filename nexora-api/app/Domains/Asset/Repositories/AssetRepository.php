<?php

namespace App\Domains\Asset\Repositories;

use App\Domains\Asset\Models\Asset;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class AssetRepository extends BaseRepository implements AssetRepositoryInterface
{
    protected function model(): string
    {
        return Asset::class;
    }
}


