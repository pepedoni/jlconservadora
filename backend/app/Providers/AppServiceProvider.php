<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Builder;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        
        Builder::macro('whereLikeAll', function($attributes, string $searchTerm) { 
           
            foreach($attributes as $attribute) {
                $this->orWhere($attribute, 'LIKE', "%{$searchTerm}%");
            }
            
            return $this;
        });

        Builder::macro('whereLike', function($attributes) { 
           
            foreach($attributes as $key => $value) {
                if($value) {
                    $this->orWhere($key, 'LIKE', "%{$value}%");
                }
            }
            
            return $this;
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }


}
