<?php

namespace App\Domains\BusinessPartner\Repositories;

use App\Domains\BusinessPartner\Models\Customer;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{
    protected function model(): string
    {
        return Customer::class;
    }
}


