<?php

namespace App\Domains\Sales\Controllers;

use App\Domains\Sales\Services\InvoiceService;
use App\Domains\Sales\Resources\InvoiceResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Sales\Requests\StoreInvoiceRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends ApiController
{
    public function __construct(
        protected InvoiceService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'customer_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(InvoiceResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('items');
        return $this->success(new InvoiceResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreInvoiceRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['outstanding'] = ($data['total_amount'] ?? 0) - ($data['paid_amount'] ?? 0);
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new InvoiceResource($model), 'Created successfully');
    }

    public function summary(Request $request): JsonResponse
    {
        $filters = $request->only(['date_from', 'date_to']);
        $summary = $this->service->reportSummary($filters);
        return $this->success($summary, 'Summary retrieved successfully');
    }

    public function customerReport(Request $request): JsonResponse
    {
        $filters = $request->only(['date_from', 'date_to']);
        $data = $this->service->customerReport($filters);
        return $this->success($data, 'Customer report retrieved successfully');
    }

    public function outstandingReport(Request $request): JsonResponse
    {
        $filters = $request->only(['date_from', 'date_to', 'status', 'customer_id']);
        $data = $this->service->outstandingReport($filters);
        return $this->success($data, 'Outstanding report retrieved successfully');
    }
}
