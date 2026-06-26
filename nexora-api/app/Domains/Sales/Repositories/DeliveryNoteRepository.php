<?php

namespace App\Domains\Sales\Repositories;

use App\Domains\Sales\Models\DeliveryNote;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class DeliveryNoteRepository extends BaseRepository
{
    protected function model(): string
    {
        return DeliveryNote::class;
    }
}
