<?php

namespace App\Domains\Finance\Repositories;

use App\Domains\Finance\Models\CostCenter;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class CostCenterRepository extends BaseRepository implements CostCenterRepositoryInterface
{
    protected function model(): string
    {
        return CostCenter::class;
    }
}


