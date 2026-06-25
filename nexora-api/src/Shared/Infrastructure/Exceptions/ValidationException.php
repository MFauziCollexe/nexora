<?php

namespace Shared\Infrastructure\Exceptions;

use RuntimeException;

class ValidationException extends RuntimeException
{
    public function __construct(string $message = 'Validation error', int $code = 422)
    {
        parent::__construct($message, $code);
    }
}
