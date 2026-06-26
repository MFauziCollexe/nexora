<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\PurchaseRequest;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class PurchaseRequestRepository extends BaseRepository implements PurchaseRequestRepositoryInterface
{
    protected function model(): string
    {
        return PurchaseRequest::class;
    }
}
