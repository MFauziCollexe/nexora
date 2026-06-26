<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\GoodsReceipt;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class GoodsReceiptRepository extends BaseRepository implements GoodsReceiptRepositoryInterface
{
    protected function model(): string
    {
        return GoodsReceipt::class;
    }
}
