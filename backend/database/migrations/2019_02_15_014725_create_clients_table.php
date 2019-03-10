<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->integer('type');
            $table->string('address', 255);
            $table->integer('address_number');
            $table->string('address_complement');
            $table->integer('cond_blocks')->default(null);
            $table->integer('cond_floors')->default(null);
            $table->integer('cond_aps')->default(null);
            $table->string('syndic_ap', 5);
            $table->date('syndic_birthday');
            $table->string('syndic_email', 50);
            $table->string('home_contact', 11);
            $table->string('phone_contact', 11);
            $table->date('manage_init');
            $table->date('manage_end');
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
        Schema::dropIfExists('clients');
    }
}
