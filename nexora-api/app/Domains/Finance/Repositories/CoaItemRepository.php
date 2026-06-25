<?php

namespace App\Domains\Finance\Repositories;

use App\Domains\Finance\Models\CoaItem;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class CoaItemRepository extends BaseRepository implements CoaItemRepositoryInterface
{
    protected function model(): string
    {
        return CoaItem::class;
    }
}


