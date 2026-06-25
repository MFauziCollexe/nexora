<?php

namespace App\Domains\Company\Repositories;

use App\Domains\Company\Models\Branch;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class BranchRepository extends BaseRepository implements BranchRepositoryInterface
{
    protected function model(): string
    {
        return Branch::class;
    }
}


