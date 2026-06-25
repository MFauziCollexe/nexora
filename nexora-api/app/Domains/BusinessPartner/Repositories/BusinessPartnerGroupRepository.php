<?php

namespace App\Domains\BusinessPartner\Repositories;

use App\Domains\BusinessPartner\Models\BusinessPartnerGroup;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class BusinessPartnerGroupRepository extends BaseRepository implements BusinessPartnerGroupRepositoryInterface
{
    protected function model(): string
    {
        return BusinessPartnerGroup::class;
    }
}


