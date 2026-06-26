<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\SupplierReturnService;
use App\Domains\Purchase\Resources\SupplierReturnResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StoreSupplierReturnRequest;
use App\Domains\Purchase\Requests\UpdateSupplierReturnRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierReturnController extends ApiController
{
    public function __construct(
        protected SupplierReturnService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'supplier_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(SupplierReturnResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('purchaseOrder', 'supplier', 'goodsReceipt', 'returnedBy', 'items');
        return $this->success(new SupplierReturnResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreSupplierReturnRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new SupplierReturnResource($model), 'Created successfully');
    }

    public function update(UpdateSupplierReturnRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new SupplierReturnResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
