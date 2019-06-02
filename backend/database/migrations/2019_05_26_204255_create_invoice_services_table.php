<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoiceServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_services', function (Blueprint $table) {
            
            $table->increments('id');

            $table->unsignedInteger('invoice_id');
            $table->unsignedInteger('service_id');
            $table->longText('description');
            $table->double('value');

            $table->foreign('invoice_id')->references('id')->on('invoices');
            $table->foreign('service_id')->references('id')->on('services');

            $table->double('aliquot_iss');
            $table->double('value_iss');

            $table->double('aliquot_inss');
            $table->double('value_inss');
            
            $table->double('aliquot_pis');
            $table->double('value_pis');

            $table->double('aliquot_cofins');
            $table->double('value_cofins');

            $table->double('aliquot_csll');
            $table->double('value_csll');

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
        Schema::dropIfExists('invoice_services');
    }
}
