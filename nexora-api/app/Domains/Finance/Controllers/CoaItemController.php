<?php

namespace App\Domains\Finance\Controllers;

use App\Domains\Finance\Services\CoaItemService;
use App\Domains\Finance\Resources\CoaItemResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Finance\Requests\StoreCoaItemRequest;
use App\Domains\Finance\Requests\UpdateCoaItemRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CoaItemController extends ApiController
{
    public function __construct(
        protected CoaItemService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(CoaItemResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new CoaItemResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreCoaItemRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new CoaItemResource($model), 'Created successfully');
    }

    public function update(UpdateCoaItemRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new CoaItemResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}