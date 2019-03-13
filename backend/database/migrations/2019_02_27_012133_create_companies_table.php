<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('companies');
        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');  
            $table->string('inscription');
            $table->string('municipal_inscription');
            $table->string('name');
            $table->string('taxation_regime');
            $table->string('national_simple');
            $table->string('cultural_promoter');
            $table->string('cep');
            $table->string('state');
            $table->string('city');
            $table->string('address_district');
            $table->string('address');
            $table->integer('address_number');
            $table->string('address_complement');
            $table->unique('inscription');
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
        Schema::dropIfExists('companies');
    }
}
