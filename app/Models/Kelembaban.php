<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelembaban extends Model
{
    use HasFactory;

    protected $table = 'kelembaban';

    protected $fillable = ['kelembaban'];
}
