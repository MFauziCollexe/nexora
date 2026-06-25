<?php

namespace Shared\Domain\ValueObjects;

abstract class BaseValueObject
{
    public function equals(BaseValueObject $other): bool
    {
        return serialize($this) === serialize($other);
    }

    abstract public function toString(): string;
}
