<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\PurchaseRequestService;
use App\Domains\Purchase\Resources\PurchaseRequestResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StorePurchaseRequestRequest;
use App\Domains\Purchase\Requests\UpdatePurchaseRequestRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseRequestController extends ApiController
{
    public function __construct(
        protected PurchaseRequestService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'priority', 'department', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(PurchaseRequestResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('requester');
        return $this->success(new PurchaseRequestResource($model), 'Detail retrieved successfully');
    }

    public function store(StorePurchaseRequestRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new PurchaseRequestResource($model), 'Created successfully');
    }

    public function update(UpdatePurchaseRequestRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new PurchaseRequestResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
