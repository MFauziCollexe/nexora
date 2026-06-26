<?php

namespace App\Domains\Sales\Repositories;

use App\Domains\Sales\Models\DeliveryOrder;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class DeliveryOrderRepository extends BaseRepository
{
    protected function model(): string
    {
        return DeliveryOrder::class;
    }
}
