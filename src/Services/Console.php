<?php

namespace Greabock\Console\Services;

class Console
{
    protected $response;

    public function runEval($code)
    {
        $code = str_replace('<?php','', $code);

        $this->response = [];

        $queries = collect([]);

        app('db')->listen(function ($sql, $bindings, $time) use( $queries) {
            $queries->push(compact('sql' ,'bindings', 'time'));
        });

        $startTime = time();
        $this->ob($code);

        $this->response['time'] = time() - $startTime;
        $this->response['peak_memory'] = memory_get_peak_usage();
        $this->response['sql']['time'] = $queries->sum('time');
        $this->response['sql']['queries'] = $queries;

        return $this->response;
    }

    protected function ob($code)
    {
        ob_start();
        @eval($code);
        $this->response['output'] = ob_get_contents();
        ob_end_clean();
    }
}