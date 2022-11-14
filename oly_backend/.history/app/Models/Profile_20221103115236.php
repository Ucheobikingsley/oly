<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','country_id','state','street','zip_code', 'dob'];

    public function country(){
        return $this->belongsTo(Country::class);
    }
}
