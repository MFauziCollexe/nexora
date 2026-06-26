<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\PurchaseOrderService;
use App\Domains\Purchase\Resources\PurchaseOrderResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StorePurchaseOrderRequest;
use App\Domains\Purchase\Requests\UpdatePurchaseOrderRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseOrderController extends ApiController
{
    public function __construct(
        protected PurchaseOrderService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'priority', 'supplier_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(PurchaseOrderResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('supplier', 'requester', 'items');
        return $this->success(new PurchaseOrderResource($model), 'Detail retrieved successfully');
    }

    public function store(StorePurchaseOrderRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new PurchaseOrderResource($model), 'Created successfully');
    }

    public function update(UpdatePurchaseOrderRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new PurchaseOrderResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
