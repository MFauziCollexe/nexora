<?php

namespace App\Domains\Finance\Controllers;

use App\Domains\Finance\Services\BankAccountService;
use App\Domains\Finance\Resources\BankAccountResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Finance\Requests\StoreBankAccountRequest;
use App\Domains\Finance\Requests\UpdateBankAccountRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BankAccountController extends ApiController
{
    public function __construct(
        protected BankAccountService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'is_active']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(BankAccountResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new BankAccountResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreBankAccountRequest $request): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->create($data);
        return $this->created(new BankAccountResource($model), 'Created successfully');
    }

    public function update(UpdateBankAccountRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $model = $this->service->update($id, $data);
        return $this->success(new BankAccountResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}