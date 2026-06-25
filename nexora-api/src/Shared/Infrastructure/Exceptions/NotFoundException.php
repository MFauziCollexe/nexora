<?php

namespace Shared\Infrastructure\Exceptions;

use RuntimeException;

class NotFoundException extends RuntimeException
{
    public function __construct(string $message = 'Resource not found', int $code = 404)
    {
        parent::__construct($message, $code);
    }
}
