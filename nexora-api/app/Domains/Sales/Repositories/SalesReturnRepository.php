<?php

namespace App\Domains\Sales\Repositories;

use App\Domains\Sales\Models\SalesReturn;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SalesReturnRepository extends BaseRepository
{
    protected function model(): string
    {
        return SalesReturn::class;
    }
}
