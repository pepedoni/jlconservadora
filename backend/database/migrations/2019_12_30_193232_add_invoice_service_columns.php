<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddInvoiceServiceColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoice_services', function (Blueprint $table) {
            $table->integer('taxation_code');
            $table->double('conditioned_discount');
            $table->double('unconditioned_discount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoice_services', function (Blueprint $table) {
            $table->dropColumn('taxation_code');
            $table->dropColumn('conditioned_discount');
            $table->dropColumn('unconditioned_discount');
        });
    }
}
