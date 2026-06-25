<?php

namespace App\Domains\HumanResource\Repositories;

use App\Domains\HumanResource\Models\Department;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class DepartmentRepository extends BaseRepository implements DepartmentRepositoryInterface
{
    protected function model(): string
    {
        return Department::class;
    }
}


