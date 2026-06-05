<?php

namespace App\Domains\AiChat\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AiChatController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'messages'           => ['required', 'array'],
            'messages.*.role'    => ['required', 'in:user,assistant'],
            'messages.*.content' => ['required', 'string'],
        ]);

        // ── Ambil schema semua tabel ───────────────
        $schema = $this->getDatabaseSchema();

        // ── System prompt dengan schema ────────────
        $systemPrompt = "Kamu adalah asisten AI untuk Nexora ERP API platform.
Kamu bisa menjawab pertanyaan umum DAN mengakses database Nexora secara langsung.

SCHEMA DATABASE:
{$schema}

CARA KERJA:
- Jika pertanyaan membutuhkan data dari database, balas HANYA dengan JSON format berikut (tanpa teks lain):
{\"action\": \"query\", \"sql\": \"SELECT ... FROM ...\"}
- Gunakan query yang AMAN: hanya SELECT, tidak boleh INSERT/UPDATE/DELETE/DROP
- Jika pertanyaan tidak butuh database, jawab langsung dengan teks biasa
- Jawab singkat dan jelas karena akan dibacakan lewat speaker
- Maksimal 3 kalimat untuk jawaban non-data
- Gunakan Bahasa Indonesia";

        // ── Kirim ke Groq ──────────────────────────
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.groq.key'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model'      => 'llama-3.3-70b-versatile',
            'max_tokens' => 512,
            'messages'   => array_merge(
                [['role' => 'system', 'content' => $systemPrompt]],
                $request->messages
            ),
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Gagal menghubungi AI.'], 500);
        }

        $aiReply = $response->json('choices.0.message.content', '');

        // ── Cek apakah AI mau query database ──────
        $decoded = json_decode(trim($aiReply), true);

        if (isset($decoded['action']) && $decoded['action'] === 'query' && isset($decoded['sql'])) {
            $sql = $decoded['sql'];

            // Safety check — hanya boleh SELECT
            if (!$this->isSafeQuery($sql)) {
                return response()->json(['reply' => 'Maaf, saya hanya bisa membaca data, tidak bisa mengubah database.']);
            }

            try {
                // Jalankan query
                $results = DB::select($sql);
                $resultJson = json_encode($results, JSON_PRETTY_PRINT);

                // Kirim hasil ke AI untuk dijadikan jawaban natural
                $followUp = Http::withHeaders([
                    'Authorization' => 'Bearer ' . config('services.groq.key'),
                    'Content-Type'  => 'application/json',
                ])->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model'      => 'llama-3.3-70b-versatile',
                    'max_tokens' => 256,
                    'messages'   => [
                        ['role' => 'system', 'content' => 'Ubah hasil query database berikut menjadi jawaban singkat dalam Bahasa Indonesia. Maksimal 2 kalimat. Langsung ke poin, tidak perlu basa-basi.'],
                        ['role' => 'user',   'content' => "Pertanyaan: {$request->messages[count($request->messages)-1]['content']}\n\nHasil query:\n{$resultJson}"],
                    ],
                ]);

                $naturalReply = $followUp->json('choices.0.message.content', 'Maaf, tidak bisa memproses hasilnya.');

                return response()->json(['reply' => $naturalReply]);

            } catch (\Exception $e) {
                return response()->json(['reply' => 'Maaf, terjadi kesalahan saat mengambil data dari database.']);
            }
        }

        // ── Jawaban biasa (bukan query) ────────────
        return response()->json(['reply' => $aiReply]);
    }

    // ── Ambil schema semua tabel ───────────────────
    private function getDatabaseSchema(): string
    {
        $tables  = DB::select('SHOW TABLES');
        $dbName  = DB::getDatabaseName();;
        $schema  = '';

        foreach ($tables as $table) {
            $tableName = array_values((array) $table)[0];
            $columns   = DB::select("SHOW COLUMNS FROM `{$tableName}`");

            $cols = collect($columns)->map(fn($col) =>
                "{$col->Field} ({$col->Type})"
            )->implode(', ');

            $schema .= "- {$tableName}: {$cols}\n";
        }

        return $schema ?: 'Tidak ada tabel ditemukan.';
    }

    // ── Safety check query ─────────────────────────
    private function isSafeQuery(string $sql): bool
    {
        $sql   = strtolower(trim($sql));
        $forbidden = ['insert', 'update', 'delete', 'drop', 'truncate', 'alter', 'create', 'replace', 'grant', 'revoke'];

        foreach ($forbidden as $word) {
            if (str_contains($sql, $word)) return false;
        }

        return str_starts_with($sql, 'select');
    }
}