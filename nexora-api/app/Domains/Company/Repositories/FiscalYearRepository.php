<?php

namespace App\Domains\Company\Repositories;

use App\Domains\Company\Models\FiscalYear;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class FiscalYearRepository extends BaseRepository implements FiscalYearRepositoryInterface
{
    protected function model(): string
    {
        return FiscalYear::class;
    }
}


