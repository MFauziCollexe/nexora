<?php

namespace App\Domains\Sales\Controllers;

use App\Domains\Sales\Services\QuotationService;
use App\Domains\Sales\Resources\QuotationResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Sales\Requests\StoreQuotationRequest;
use App\Domains\Sales\Requests\UpdateQuotationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuotationController extends ApiController
{
    public function __construct(
        protected QuotationService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'customer_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(QuotationResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('items', 'salesPerson');
        return $this->success(new QuotationResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreQuotationRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        $model->load('items', 'salesPerson');
        return $this->created(new QuotationResource($model), 'Created successfully');
    }

    public function update(UpdateQuotationRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new QuotationResource($model), 'Updated successfully');
    }

    public function uploadAttachments(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'attachments' => 'required|array',
            'attachments.*' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $model = $this->service->findOrFail($id);
        $existing = $model->attachments ?? [];
        $files = $request->file('attachments', []);

        foreach ($files as $file) {
            $existing[] = $file->store('quotations', 'public');
        }

        $model->update(['attachments' => $existing]);
        return $this->success(new QuotationResource($model->load('items', 'salesPerson')), 'Attachments uploaded successfully');
    }

    public function deleteAttachment(Request $request, int $id): JsonResponse
    {
        $request->validate(['index' => 'required|integer|min:0']);

        $model = $this->service->findOrFail($id);
        $attachments = $model->attachments ?? [];
        $index = (int) $request->input('index');

        if (!isset($attachments[$index])) {
            return $this->error('Attachment not found', 404);
        }

        $path = $attachments[$index];
        \Illuminate\Support\Facades\Storage::disk('public')->delete($path);

        unset($attachments[$index]);
        $model->update(['attachments' => array_values($attachments)]);

        return $this->success(new QuotationResource($model->load('items', 'salesPerson')), 'Attachment deleted successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }

    public function convertToSo(Request $request, int $id): JsonResponse
    {
        $extra = $request->only(['so_no', 'date', 'notes']);
        $extra['created_by'] = $request->user()->id ?? null;

        try {
            $salesOrder = $this->service->convertToSo($id, $extra);
            return $this->created($salesOrder->toArray(), 'Converted to Sales Order successfully');
        } catch (\RuntimeException $e) {
            return $this->error($e->getMessage(), 422);
        }
    }
}
