<?php

namespace App\Domains\BusinessPartner\Controllers;

use App\Domains\BusinessPartner\Services\SupplierService;
use App\Domains\BusinessPartner\Resources\SupplierResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\BusinessPartner\Requests\StoreSupplierRequest;
use App\Domains\BusinessPartner\Requests\UpdateSupplierRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierController extends ApiController
{
    public function __construct(
        protected SupplierService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(SupplierResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new SupplierResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreSupplierRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new SupplierResource($model), 'Created successfully');
    }

    public function update(UpdateSupplierRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new SupplierResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}