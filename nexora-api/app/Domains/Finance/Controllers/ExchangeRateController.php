<?php

namespace App\Domains\Finance\Controllers;

use App\Domains\Finance\Services\ExchangeRateService;
use App\Domains\Finance\Resources\ExchangeRateResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Finance\Requests\StoreExchangeRateRequest;
use App\Domains\Finance\Requests\UpdateExchangeRateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExchangeRateController extends ApiController
{
    public function __construct(
        protected ExchangeRateService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(ExchangeRateResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new ExchangeRateResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreExchangeRateRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new ExchangeRateResource($model), 'Created successfully');
    }

    public function update(UpdateExchangeRateRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new ExchangeRateResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}