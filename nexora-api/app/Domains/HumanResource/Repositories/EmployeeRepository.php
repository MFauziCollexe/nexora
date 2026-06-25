<?php

namespace App\Domains\HumanResource\Repositories;

use App\Domains\HumanResource\Models\Employee;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class EmployeeRepository extends BaseRepository implements EmployeeRepositoryInterface
{
    protected function model(): string
    {
        return Employee::class;
    }
}


