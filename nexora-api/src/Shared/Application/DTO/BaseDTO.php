<?php

namespace Shared\Application\DTO;

use Illuminate\Support\Str;

abstract class BaseDTO
{
    public static function fromRequest(array $data): static
    {
        $dto = new static();
        foreach ($data as $key => $value) {
            $property = Str::camel($key);
            if (property_exists($dto, $property)) {
                $dto->$property = $value;
            }
        }
        return $dto;
    }

    public function toArray(): array
    {
        $data = [];
        foreach (get_object_vars($this) as $property => $value) {
            $key = Str::snake($property);
            $data[$key] = $value;
        }
        return $data;
    }
}
