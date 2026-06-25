<?php

namespace App\Domains\HumanResource\Controllers;

use App\Domains\HumanResource\Services\DepartmentService;
use App\Domains\HumanResource\Resources\DepartmentResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\HumanResource\Requests\StoreDepartmentRequest;
use App\Domains\HumanResource\Requests\UpdateDepartmentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepartmentController extends ApiController
{
    public function __construct(
        protected DepartmentService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(DepartmentResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new DepartmentResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreDepartmentRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new DepartmentResource($model), 'Created successfully');
    }

    public function update(UpdateDepartmentRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new DepartmentResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}