<?php

namespace App\Domains\Inventory\Repositories;

use App\Domains\Inventory\Models\SerialNumber;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class SerialNumberRepository extends BaseRepository implements SerialNumberRepositoryInterface
{
    protected function model(): string
    {
        return SerialNumber::class;
    }
}
