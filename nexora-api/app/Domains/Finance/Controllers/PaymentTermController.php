<?php

namespace App\Domains\Finance\Controllers;

use App\Domains\Finance\Services\PaymentTermService;
use App\Domains\Finance\Resources\PaymentTermResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Finance\Requests\StorePaymentTermRequest;
use App\Domains\Finance\Requests\UpdatePaymentTermRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentTermController extends ApiController
{
    public function __construct(
        protected PaymentTermService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(PaymentTermResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new PaymentTermResource($model), 'Detail retrieved successfully');
    }

    public function store(StorePaymentTermRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new PaymentTermResource($model), 'Created successfully');
    }

    public function update(UpdatePaymentTermRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new PaymentTermResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}