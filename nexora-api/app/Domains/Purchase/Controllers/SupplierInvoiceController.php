<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\SupplierInvoiceService;
use App\Domains\Purchase\Resources\SupplierInvoiceResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StoreSupplierInvoiceRequest;
use App\Domains\Purchase\Requests\UpdateSupplierInvoiceRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierInvoiceController extends ApiController
{
    public function __construct(
        protected SupplierInvoiceService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'payment_status', 'supplier_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(SupplierInvoiceResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('supplier', 'purchaseOrder', 'goodsReceipt', 'items');
        return $this->success(new SupplierInvoiceResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreSupplierInvoiceRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new SupplierInvoiceResource($model), 'Created successfully');
    }

    public function update(UpdateSupplierInvoiceRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new SupplierInvoiceResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
