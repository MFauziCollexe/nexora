<?php

namespace App\Domains\Purchase\Controllers;

use App\Domains\Purchase\Services\RfqService;
use App\Domains\Purchase\Resources\RfqResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Purchase\Requests\StoreRfqRequest;
use App\Domains\Purchase\Requests\UpdateRfqRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RfqController extends ApiController
{
    public function __construct(
        protected RfqService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'priority', 'supplier_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(RfqResource::collection($data), 'List retrieved successfully', 200, [
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
        $model->load('requester', 'items');
        return $this->success(new RfqResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreRfqRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new RfqResource($model), 'Created successfully');
    }

    public function update(UpdateRfqRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new RfqResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
