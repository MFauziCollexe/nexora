<?php

namespace App\Domains\Asset\Controllers;

use App\Domains\Asset\Services\AssetCategoryService;
use App\Domains\Asset\Resources\AssetCategoryResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Asset\Requests\StoreAssetCategoryRequest;
use App\Domains\Asset\Requests\UpdateAssetCategoryRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssetCategoryController extends ApiController
{
    public function __construct(
        protected AssetCategoryService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(AssetCategoryResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new AssetCategoryResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreAssetCategoryRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new AssetCategoryResource($model), 'Created successfully');
    }

    public function update(UpdateAssetCategoryRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new AssetCategoryResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}