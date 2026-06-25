<?php

namespace App\Domains\Inventory\Controllers;

use App\Domains\Inventory\Services\ItemTypeService;
use App\Domains\Inventory\Resources\ItemTypeResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Inventory\Requests\StoreItemTypeRequest;
use App\Domains\Inventory\Requests\UpdateItemTypeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemTypeController extends ApiController
{
    public function __construct(
        protected ItemTypeService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(ItemTypeResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new ItemTypeResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreItemTypeRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new ItemTypeResource($model), 'Created successfully');
    }

    public function update(UpdateItemTypeRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new ItemTypeResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}