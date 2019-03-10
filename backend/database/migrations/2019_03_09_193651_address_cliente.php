<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddressCliente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clients', function($table) {
            $table->string('cep');
            $table->string('state');
            $table->string('city');
            $table->string('address_district', 100);
            $table->boolean('is_active')->defult(true);
            $table->string('inscription', 14);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
