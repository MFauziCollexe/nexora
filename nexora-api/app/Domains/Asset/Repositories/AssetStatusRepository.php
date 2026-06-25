<?php

namespace App\Domains\Asset\Repositories;

use App\Domains\Asset\Models\AssetStatus;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class AssetStatusRepository extends BaseRepository implements AssetStatusRepositoryInterface
{
    protected function model(): string
    {
        return AssetStatus::class;
    }
}


