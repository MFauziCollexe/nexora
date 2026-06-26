<?php

namespace App\Domains\Purchase\Repositories;

use App\Domains\Purchase\Models\VendorEvaluation;
use Shared\Infrastructure\Persistence\Repositories\BaseRepository;

class VendorEvaluationRepository extends BaseRepository implements VendorEvaluationRepositoryInterface
{
    protected function model(): string
    {
        return VendorEvaluation::class;
    }
}
