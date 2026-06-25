<?php

namespace App\Domains\Finance\Controllers;

use App\Domains\Finance\Services\ProfitCenterService;
use App\Domains\Finance\Resources\ProfitCenterResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Finance\Requests\StoreProfitCenterRequest;
use App\Domains\Finance\Requests\UpdateProfitCenterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfitCenterController extends ApiController
{
    public function __construct(
        protected ProfitCenterService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(ProfitCenterResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new ProfitCenterResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreProfitCenterRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new ProfitCenterResource($model), 'Created successfully');
    }

    public function update(UpdateProfitCenterRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new ProfitCenterResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}