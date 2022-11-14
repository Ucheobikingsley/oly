<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\Profile;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{

    use HttpResponses;
    public function createProfile(ProfileRequest $request)
    {
      $request->validated($request->all());
      Profile::create([
        'user_id'=> Auth::user()->id,
        'state'=>$request->state,
        'country_id'=>$request->country_id,
        'street'=>$request->street,
        'dob'=>$request->dob,
      ]);

     

     return $this->success([], 'Profile Updated'); 
    }

    public function updateProfile(Request $request)
    {
        // DB::table('profiles')
        //       ->where('user_id', Auth::user()->id)
        //       ->update(['dob' => $request->dob]);

        Profile::whereId(Auth::user()->id->update($request->all());
              
        return $this->success([], 'Profile Updated');
    }
}
