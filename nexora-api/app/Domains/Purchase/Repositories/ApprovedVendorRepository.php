<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\ApprovedVendor;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class ApprovedVendorRepository extends BaseRepository implements ApprovedVendorRepositoryInterface
{
    protected function model(): string
    {
        return ApprovedVendor::class;
    }
}
