<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'category'];

    protected function saveImg() : Attribute{
        return Attribute::make(
            get: fn ($value) => url('uploads/'.$value),
        );
    }

    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
