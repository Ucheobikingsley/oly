<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request){
        $request->validated($request->all());
        if(!Auth::attempt($request->only(['email','password']))){
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $request->email)->first();
    //    $user = DB::table('users')->where('email', $request->email)->first();
        return $this->success([
            'user'=>$user,
            'token'=>$user->createToken('Api Token of'. $user->name)-> plainTextToken
        ]);
    }

    public function register(StoreUserRequest $request){
        $request->validated($request->all());
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request -> password),
        ]);

        // if ($request->user()->hasVerifiedEmail()) {
        //     return [
        //         'message' => 'Already Verified'
        //     ];
        // }

        $request->user()->sendEmailVerificationNotification();
        // return $this->success([
        //      'user'=> $user,
        //      'token'=>$user->createToken('API Token of'. $user->name)->plainTextToken
        // ]);

        return $this->success([
            'message'=> 'Email Verification sent successfully, please check your mail',
            'token'=>$user->createToken('API Token of'. $user->name)->plainTextToken
       ]);
    }

    public function logout(){
        return response()->json('This is a logout method');
    }
}
