<?php

namespace App\Domains\Finance\Repositories;

use App\Domains\Finance\Models\ExchangeRate;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class ExchangeRateRepository extends BaseRepository implements ExchangeRateRepositoryInterface
{
    protected function model(): string
    {
        return ExchangeRate::class;
    }
}


