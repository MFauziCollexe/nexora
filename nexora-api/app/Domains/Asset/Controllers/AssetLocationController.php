<?php

namespace App\Domains\Asset\Controllers;

use App\Domains\Asset\Services\AssetLocationService;
use App\Domains\Asset\Resources\AssetLocationResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Asset\Requests\StoreAssetLocationRequest;
use App\Domains\Asset\Requests\UpdateAssetLocationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssetLocationController extends ApiController
{
    public function __construct(
        protected AssetLocationService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(AssetLocationResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new AssetLocationResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreAssetLocationRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new AssetLocationResource($model), 'Created successfully');
    }

    public function update(UpdateAssetLocationRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new AssetLocationResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}