<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\Rfq;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class RfqRepository extends BaseRepository implements RfqRepositoryInterface
{
    protected function model(): string
    {
        return Rfq::class;
    }
}
