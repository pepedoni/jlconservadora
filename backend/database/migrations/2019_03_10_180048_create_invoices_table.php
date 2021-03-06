<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('invoices');
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('provider_inscription', 14);
            $table->string('provider_inscription_municipal', 15);
            $table->string('provider_social_name', 115);

            
            $table->string('client_inscription', 14);;
            $table->string('client_name', 115);
            
            $table->string('number', 10)->nullable();
            $table->double('value');
            
            $table->double('dedution_value')->default(0.00);
            $table->double('other_retain_value')->default(0.00);
            $table->double('base_calculation')->default(0.00);
            
            $table->integer('iss_retain');
            
            $table->date('provision_date');
            $table->string('provision_state');
            $table->string('provision_city_ibge', 7);
            $table->string('provision_city_name', 50);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
