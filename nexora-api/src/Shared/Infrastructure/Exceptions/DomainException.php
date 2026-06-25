<?php

namespace Shared\Infrastructure\Exceptions;

use RuntimeException;

class DomainException extends RuntimeException
{
    public function __construct(string $message = 'Domain error', int $code = 422)
    {
        parent::__construct($message, $code);
    }
}
