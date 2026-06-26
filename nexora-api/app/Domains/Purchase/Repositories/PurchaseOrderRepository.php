<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\PurchaseOrder;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class PurchaseOrderRepository extends BaseRepository implements PurchaseOrderRepositoryInterface
{
    protected function model(): string
    {
        return PurchaseOrder::class;
    }
}
