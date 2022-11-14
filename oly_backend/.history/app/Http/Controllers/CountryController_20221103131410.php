<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    use HttpResponses;
    public function getCountries()
    {
        $countries = Country::all();
        return $this->success($countries)

    }
}
