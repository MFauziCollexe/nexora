<?php

namespace App\Domains\Sales\Repositories;

use App\Domains\Sales\Models\Quotation;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class QuotationRepository extends BaseRepository implements QuotationRepositoryInterface
{
    protected function model(): string
    {
        return Quotation::class;
    }
}
