<?php

namespace App\Domains\Company\Controllers;

use App\Domains\Company\Services\CurrencyService;
use App\Domains\Company\Resources\CurrencyResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Company\Requests\StoreCurrencyRequest;
use App\Domains\Company\Requests\UpdateCurrencyRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CurrencyController extends ApiController
{
    public function __construct(
        protected CurrencyService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(CurrencyResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new CurrencyResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreCurrencyRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new CurrencyResource($model), 'Created successfully');
    }

    public function update(UpdateCurrencyRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new CurrencyResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}