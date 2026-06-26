<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\SupplierInvoice;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SupplierInvoiceRepository extends BaseRepository implements SupplierInvoiceRepositoryInterface
{
    protected function model(): string
    {
        return SupplierInvoice::class;
    }
}
