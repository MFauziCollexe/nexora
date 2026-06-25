<?php

namespace App\Domains\Inventory\Controllers;

use App\Domains\Inventory\Services\UomService;
use App\Domains\Inventory\Resources\UomResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Inventory\Requests\StoreUomRequest;
use App\Domains\Inventory\Requests\UpdateUomRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UomController extends ApiController
{
    public function __construct(
        protected UomService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(UomResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new UomResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreUomRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new UomResource($model), 'Created successfully');
    }

    public function update(UpdateUomRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new UomResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}