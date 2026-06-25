<?php

namespace App\Domains\Finance\Repositories;

use App\Domains\Finance\Models\PaymentTerm;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class PaymentTermRepository extends BaseRepository implements PaymentTermRepositoryInterface
{
    protected function model(): string
    {
        return PaymentTerm::class;
    }
}


