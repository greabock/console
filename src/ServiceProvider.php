<?php

namespace Greabock\Console;

use Greabock\Console\Services\Console;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider as BaseProvider;

class ServiceProvider extends BaseProvider
{
    public function register()
    {
        $this->app->singleton(Console::class, Console::class);
    }

    public function boot()
    {
        $this->bootViews();
        $this->bootRoutes();
    }

    protected function bootViews()
    {
        $this->loadViewsFrom(str_replace('/', DIRECTORY_SEPARATOR, __DIR__.'/path/to/views'), 'greabock/console');

        $this->publishes([
            str_replace('/', DIRECTORY_SEPARATOR, __DIR__.'/../resources/views')
                => str_replace('/', DIRECTORY_SEPARATOR, base_path('resources/views/vendor/greabock/console')),

            str_replace('/', DIRECTORY_SEPARATOR, __DIR__.'/../config/console.php')
                =>  str_replace('/', DIRECTORY_SEPARATOR, config_path('console.php')),

            str_replace('/', DIRECTORY_SEPARATOR, __DIR__.'/../resources/assets')
                => str_replace('/', DIRECTORY_SEPARATOR, public_path('assets/greabock/console')),
        ], 'greabock/console');
    }

    private function bootRoutes()
    {
        $path = str_replace('/', DIRECTORY_SEPARATOR, config('console.route_path',  __DIR__.'/Http/routes.php'));
        include_once($path);
    }
}