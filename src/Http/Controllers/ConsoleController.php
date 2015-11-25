<?php

namespace Greabock\Console\Http\Controllers;

use Greabock\Console\Services\Console;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\View\View;

class ConsoleController extends Controller
{
    public function getIndex()
    {
        return view('greabock/console::index');
    }

    public function postIndex(Request $request, Console $console)
    {
        return $console->runEval($request->get('code'));
    }
}