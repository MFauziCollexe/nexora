<?php

namespace App\Domains\Inventory\Controllers;

use App\Domains\Inventory\Services\ItemService;
use App\Domains\Inventory\Resources\ItemResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Inventory\Requests\StoreItemRequest;
use App\Domains\Inventory\Requests\UpdateItemRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends ApiController
{
    public function __construct(
        protected ItemService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 100), $filters);
        $data->load(['type', 'uom', 'category', 'brand']);
        return $this->success(ItemResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load(['type', 'uom', 'category', 'brand']);
        return $this->success(new ItemResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreItemRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new ItemResource($model), 'Created successfully');
    }

    public function update(UpdateItemRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new ItemResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}