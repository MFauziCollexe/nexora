<?php

namespace App\Domains\HumanResource\Controllers;

use App\Domains\HumanResource\Services\EmployeeService;
use App\Domains\HumanResource\Resources\EmployeeResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\HumanResource\Requests\StoreEmployeeRequest;
use App\Domains\HumanResource\Requests\UpdateEmployeeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends ApiController
{
    public function __construct(
        protected EmployeeService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(EmployeeResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new EmployeeResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreEmployeeRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new EmployeeResource($model), 'Created successfully');
    }

    public function update(UpdateEmployeeRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new EmployeeResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}