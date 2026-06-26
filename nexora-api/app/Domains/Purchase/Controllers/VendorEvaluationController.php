<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\VendorEvaluationService;
use App\Domains\Purchase\Resources\VendorEvaluationResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StoreVendorEvaluationRequest;
use App\Domains\Purchase\Requests\UpdateVendorEvaluationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VendorEvaluationController extends ApiController
{
    public function __construct(
        protected VendorEvaluationService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'rating', 'supplier_id']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(VendorEvaluationResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('supplier', 'evaluator', 'criteria');
        return $this->success(new VendorEvaluationResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreVendorEvaluationRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new VendorEvaluationResource($model), 'Created successfully');
    }

    public function update(UpdateVendorEvaluationRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new VendorEvaluationResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
