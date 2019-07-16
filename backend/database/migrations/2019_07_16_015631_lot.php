<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Lot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lot', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('provider_id');
            $table->string('provider_inscription', 14);
            $table->string('provider_inscription_municipal', 15);
            $table->integer('state')->default(0);

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
        Schema::dropIfExists('lot');
    }
}
