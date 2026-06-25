<?php

namespace App\Domains\Finance\Repositories;

use App\Domains\Finance\Models\ProfitCenter;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class ProfitCenterRepository extends BaseRepository implements ProfitCenterRepositoryInterface
{
    protected function model(): string
    {
        return ProfitCenter::class;
    }
}


