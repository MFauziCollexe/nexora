<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\ApprovedVendorService;
use App\Domains\Purchase\Resources\ApprovedVendorResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StoreApprovedVendorRequest;
use App\Domains\Purchase\Requests\UpdateApprovedVendorRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApprovedVendorController extends ApiController
{
    public function __construct(
        protected ApprovedVendorService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'approval_status', 'category']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(ApprovedVendorResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('supplier');
        return $this->success(new ApprovedVendorResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreApprovedVendorRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new ApprovedVendorResource($model), 'Created successfully');
    }

    public function update(UpdateApprovedVendorRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new ApprovedVendorResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
