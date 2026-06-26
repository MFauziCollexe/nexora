<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\PurchaseContract;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class PurchaseContractRepository extends BaseRepository implements PurchaseContractRepositoryInterface
{
    protected function model(): string
    {
        return PurchaseContract::class;
    }
}
