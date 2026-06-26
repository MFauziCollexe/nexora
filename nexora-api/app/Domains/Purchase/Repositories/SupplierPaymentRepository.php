<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\SupplierPayment;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SupplierPaymentRepository extends BaseRepository implements SupplierPaymentRepositoryInterface
{
    protected function model(): string
    {
        return SupplierPayment::class;
    }
}
