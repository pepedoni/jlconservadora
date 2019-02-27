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
        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');  
            $table->integer('code');
            $table->string('inscription');
            $table->string('municipal_inscription');
            $table->string('name');
            $table->string('nature_operation');
            $table->string('taxation_regime');
            $table->string('national_simple');
            $table->string('cultural_promoter');
            $table->unique('code');
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
