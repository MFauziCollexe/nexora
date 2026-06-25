<?php

namespace App\Domains\Company\Controllers;

use App\Domains\Company\Services\BranchService;
use App\Domains\Company\Resources\BranchResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Company\Requests\StoreBranchRequest;
use App\Domains\Company\Requests\UpdateBranchRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BranchController extends ApiController
{
    public function __construct(
        protected BranchService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(BranchResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new BranchResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreBranchRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new BranchResource($model), 'Created successfully');
    }

    public function update(UpdateBranchRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new BranchResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}