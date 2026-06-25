<?php

namespace App\Domains\Finance\Controllers;

use App\Domains\Finance\Services\TaxService;
use App\Domains\Finance\Resources\TaxResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Finance\Requests\StoreTaxRequest;
use App\Domains\Finance\Requests\UpdateTaxRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaxController extends ApiController
{
    public function __construct(
        protected TaxService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(TaxResource::collection($data), 'List retrieved successfully', 200, [
            'pagination' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
            ],
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $model = $this->service->findOrFail($id);
        return $this->success(new TaxResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreTaxRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new TaxResource($model), 'Created successfully');
    }

    public function update(UpdateTaxRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new TaxResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}