<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\GoodsReceiptService;
use App\Domains\Purchase\Resources\GoodsReceiptResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StoreGoodsReceiptRequest;
use App\Domains\Purchase\Requests\UpdateGoodsReceiptRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GoodsReceiptController extends ApiController
{
    public function __construct(
        protected GoodsReceiptService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'supplier_id', 'purchase_order_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(GoodsReceiptResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('purchaseOrder', 'supplier', 'receiver', 'items');
        return $this->success(new GoodsReceiptResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreGoodsReceiptRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new GoodsReceiptResource($model), 'Created successfully');
    }

    public function update(UpdateGoodsReceiptRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new GoodsReceiptResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
