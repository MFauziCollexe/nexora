<?php

namespace App\Domains\Inventory\Controllers;

use App\Domains\Inventory\Services\WarehouseService;
use App\Domains\Inventory\Resources\WarehouseResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Inventory\Requests\StoreWarehouseRequest;
use App\Domains\Inventory\Requests\UpdateWarehouseRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WarehouseController extends ApiController
{
    public function __construct(
        protected WarehouseService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(WarehouseResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new WarehouseResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreWarehouseRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new WarehouseResource($model), 'Created successfully');
    }

    public function update(UpdateWarehouseRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new WarehouseResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}