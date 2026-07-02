<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $primaryKey = 'key';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['key', 'value'];

    /**
     * Retrieve a setting's value.
     */
    public static function getValue(string $key, mixed $default = null): mixed
    {
        return Cache::rememberForever("setting.{$key}", function () use ($key, $default) {
            $setting = self::find($key);

            return $setting ? $setting->value : $default;
        });
    }

    /**
     * Set a setting's value.
     */
    public static function setValue(string $key, mixed $value): void
    {
        self::updateOrCreate(['key' => $key], ['value' => $value]);
        Cache::forget("setting.{$key}");
    }
}
