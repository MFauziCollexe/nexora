<?php

namespace App\Domains\Inventory\Controllers;

use App\Domains\Inventory\Services\BinLocationService;
use App\Domains\Inventory\Resources\BinLocationResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Inventory\Requests\StoreBinLocationRequest;
use App\Domains\Inventory\Requests\UpdateBinLocationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BinLocationController extends ApiController
{
    public function __construct(
        protected BinLocationService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(BinLocationResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new BinLocationResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreBinLocationRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new BinLocationResource($model), 'Created successfully');
    }

    public function update(UpdateBinLocationRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new BinLocationResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}