<?php

namespace App\Domains\Sales\Repositories;

use App\Domains\Sales\Models\SalesOrder;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SalesOrderRepository extends BaseRepository
{
    protected function model(): string
    {
        return SalesOrder::class;
    }
}
