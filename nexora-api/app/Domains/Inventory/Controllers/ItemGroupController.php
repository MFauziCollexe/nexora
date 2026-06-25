<?php

namespace App\Domains\Inventory\Controllers;

use App\Domains\Inventory\Services\ItemGroupService;
use App\Domains\Inventory\Resources\ItemGroupResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Inventory\Requests\StoreItemGroupRequest;
use App\Domains\Inventory\Requests\UpdateItemGroupRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemGroupController extends ApiController
{
    public function __construct(
        protected ItemGroupService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(ItemGroupResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new ItemGroupResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreItemGroupRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new ItemGroupResource($model), 'Created successfully');
    }

    public function update(UpdateItemGroupRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new ItemGroupResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}