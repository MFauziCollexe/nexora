<?php

namespace App\Domains\Finance\Repositories;

use App\Domains\Finance\Models\Tax;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class TaxRepository extends BaseRepository implements TaxRepositoryInterface
{
    protected function model(): string
    {
        return Tax::class;
    }
}


