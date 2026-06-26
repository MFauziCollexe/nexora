<?php

namespace App\Domains\Sales\Repositories;

use App\Domains\Sales\Models\Invoice;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class InvoiceRepository extends BaseRepository
{
    protected function model(): string
    {
        return Invoice::class;
    }
}
