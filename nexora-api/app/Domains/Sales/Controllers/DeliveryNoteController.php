<?php

namespace App\Domains\Sales\Controllers;

use App\Domains\Sales\Services\DeliveryNoteService;
use App\Domains\Sales\Resources\DeliveryNoteResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Sales\Requests\StoreDeliveryNoteRequest;
use App\Domains\Sales\Requests\UpdateDeliveryNoteRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeliveryNoteController extends ApiController
{
    public function __construct(
        protected DeliveryNoteService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'customer_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(DeliveryNoteResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new DeliveryNoteResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreDeliveryNoteRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new DeliveryNoteResource($model), 'Created successfully');
    }

    public function update(UpdateDeliveryNoteRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new DeliveryNoteResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
