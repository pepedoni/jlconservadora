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
            
            $table->string('number', 10);
            $table->double('value');

            $table->double('dedution_value');
            $table->double('pis_value');
            $table->double('cofins_value');
            $table->double('inss_value');
            $table->double('ir_value');
            $table->double('iss_value');
            $table->double('other_retain_value');
            $table->double('base_calculation');

            $table->integer('iss_retain');

            $table->string('provision_state');
            $table->string('provision_city_ibge', 7);
            $table->string('privision_city_name', 50);
            
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
