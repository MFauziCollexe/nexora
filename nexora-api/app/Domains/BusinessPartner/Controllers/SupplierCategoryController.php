<?php

namespace App\Domains\BusinessPartner\Controllers;

use App\Domains\BusinessPartner\Services\SupplierCategoryService;
use App\Domains\BusinessPartner\Resources\SupplierCategoryResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\BusinessPartner\Requests\StoreSupplierCategoryRequest;
use App\Domains\BusinessPartner\Requests\UpdateSupplierCategoryRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierCategoryController extends ApiController
{
    public function __construct(
        protected SupplierCategoryService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(SupplierCategoryResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new SupplierCategoryResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreSupplierCategoryRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new SupplierCategoryResource($model), 'Created successfully');
    }

    public function update(UpdateSupplierCategoryRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new SupplierCategoryResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}