##Usage

```
composer require greabock/console
```

at `config/app.php` add to providers
 
```php
Greabock\Console\ServiceProvider::class,
```

```
php artisan vendor:publish --tag=greabock/console
```

go to `http://your.site/console`;

