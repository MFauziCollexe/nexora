<?php

namespace App\Domains\Finance\Repositories;

use App\Domains\Finance\Models\BankAccount;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class BankAccountRepository extends BaseRepository implements BankAccountRepositoryInterface
{
    protected function model(): string
    {
        return BankAccount::class;
    }
}


