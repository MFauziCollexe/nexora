<?php

namespace App\Domains\AiChat\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class AiChatController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'messages'           => ['required', 'array'],
            'messages.*.role'    => ['required', 'in:user,assistant'],
            'messages.*.content' => ['required', 'string'],
        ]);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.groq.key'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model'       => 'llama-3.3-70b-versatile',
            'max_tokens'  => 512,
            'messages'    => array_merge(
                [[
                    'role'    => 'system',
                    'content' => 'Kamu adalah asisten suara untuk Nexora, sebuah ERP API platform berbasis Laravel. Jawab dengan singkat dan jelas karena jawabanmu akan dibacakan lewat speaker. Maksimal 3 kalimat per jawaban. Gunakan Bahasa Indonesia kecuali user pakai bahasa lain.',
                ]],
                $request->messages
            ),
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Gagal menghubungi AI.'], 500);
        }

        $reply = $response->json('choices.0.message.content', '');

        return response()->json(['reply' => $reply]);
    }
}