<?php

namespace App\Domains\Sales\Controllers;

use App\Domains\Sales\Services\CreditNoteService;
use App\Domains\Sales\Resources\CreditNoteResource;
use Shared\Infrastructure\Http\Responses\ApiController;
use App\Domains\Sales\Requests\StoreCreditNoteRequest;
use App\Domains\Sales\Requests\UpdateCreditNoteRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CreditNoteController extends ApiController
{
    public function __construct(
        protected CreditNoteService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status', 'customer_id', 'date_from', 'date_to']);
        $data = $this->service->paginate($request->input('per_page', 15), $filters);
        return $this->success(CreditNoteResource::collection($data), 'List retrieved successfully', 200, [
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
        return $this->success(new CreditNoteResource($model), 'Detail retrieved successfully');
    }

    public function store(StoreCreditNoteRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id ?? null;
        $model = $this->service->create($data);
        return $this->created(new CreditNoteResource($model), 'Created successfully');
    }

    public function update(UpdateCreditNoteRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['updated_by'] = $request->user()->id ?? null;
        $model = $this->service->update($id, $data);
        return $this->success(new CreditNoteResource($model), 'Updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->noContent();
    }
}
