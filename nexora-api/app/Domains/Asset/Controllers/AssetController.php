<?php

namespace App\Domains\Asset\Controllers;

use App\Domains\Asset\Services\AssetService;
use App\Domains\Asset\Resources\AssetResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Asset\Requests\StoreAssetRequest;
use App\Domains\Asset\Requests\UpdateAssetRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssetController extends ApiController
{
    public function __construct(
        protected AssetService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(AssetResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new AssetResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreAssetRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new AssetResource($model), 'Created successfully');
    }

    public function update(UpdateAssetRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new AssetResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}