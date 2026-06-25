<?php

namespace App\Domains\Finance\Controllers;

use App\Domains\Finance\Services\CostCenterService;
use App\Domains\Finance\Resources\CostCenterResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Finance\Requests\StoreCostCenterRequest;
use App\Domains\Finance\Requests\UpdateCostCenterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CostCenterController extends ApiController
{
    public function __construct(
        protected CostCenterService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(CostCenterResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new CostCenterResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreCostCenterRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new CostCenterResource($model), 'Created successfully');
    }

    public function update(UpdateCostCenterRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new CostCenterResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}