<?php

namespace App\Domains\Asset\Repositories;

use App\Domains\Asset\Models\AssetCategory;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class AssetCategoryRepository extends BaseRepository implements AssetCategoryRepositoryInterface
{
    protected function model(): string
    {
        return AssetCategory::class;
    }
}


