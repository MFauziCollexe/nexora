<?php

namespace App\Domains\Inventory\Controllers;

use App\Domains\Inventory\Services\SerialNumberService;
use App\Domains\Inventory\Resources\SerialNumberResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Inventory\Requests\StoreSerialNumberRequest;
use App\Domains\Inventory\Requests\UpdateSerialNumberRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SerialNumberController extends ApiController
{
    public function __construct(
        protected SerialNumberService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'item_id', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(SerialNumberResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new SerialNumberResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreSerialNumberRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new SerialNumberResource($model), 'Created successfully');
    }

    public function update(UpdateSerialNumberRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new SerialNumberResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
