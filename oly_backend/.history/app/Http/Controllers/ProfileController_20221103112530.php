<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function createProfile(ProfileRequest $request)
    {
      $request->validated($request->all());
      $profile = Profile::create([
        'user_id'=> Auth::user()->id,
        'state'=>$request->state,
        'country_id'=>$request->country_id,
        'street'=>$request->street,
        'dob'=>$request->dob,
      ])
    }
}
