<?php

namespace App\Domains\Company\Repositories;

use App\Domains\Company\Models\Currency;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class CurrencyRepository extends BaseRepository implements CurrencyRepositoryInterface
{
    protected function model(): string
    {
        return Currency::class;
    }
}


