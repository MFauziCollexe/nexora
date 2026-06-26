<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\SupplierPaymentService;
use App\Domains\Purchase\Resources\SupplierPaymentResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StoreSupplierPaymentRequest;
use App\Domains\Purchase\Requests\UpdateSupplierPaymentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierPaymentController extends ApiController
{
    public function __construct(
        protected SupplierPaymentService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'payment_method', 'supplier_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(SupplierPaymentResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('supplier', 'items.supplierInvoice');
        return $this->success(new SupplierPaymentResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreSupplierPaymentRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new SupplierPaymentResource($model), 'Created successfully');
    }

    public function update(UpdateSupplierPaymentRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new SupplierPaymentResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
