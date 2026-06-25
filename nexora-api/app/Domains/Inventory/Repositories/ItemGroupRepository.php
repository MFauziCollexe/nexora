<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\ItemGroup;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class ItemGroupRepository extends BaseRepository implements ItemGroupRepositoryInterface
{
    protected function model(): string
    {
        return ItemGroup::class;
    }
}


