<?php

namespace App\Domains\HumanResource\Repositories;

use App\Domains\HumanResource\Models\Position;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class PositionRepository extends BaseRepository implements PositionRepositoryInterface
{
    protected function model(): string
    {
        return Position::class;
    }
}


