<?php

namespace App\Domains\Sales\Repositories;

use App\Domains\Sales\Models\CreditNote;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class CreditNoteRepository extends BaseRepository
{
    protected function model(): string
    {
        return CreditNote::class;
    }
}
