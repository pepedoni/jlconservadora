<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddVerificationCodeToInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('verification_code', 40)->nullable();
            $table->date('competence')->nullable();
            $table->date('emission')->nullable();
            $table->unsignedInteger('lot_id')->nullable();
            $table->foreign('lot_id')->references('id')->on('lot');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign('invoices_lot_id_foreign');
            $table->dropColumn('lot_id');
            $table->dropColumn('verification_code');
            $table->dropColumn('competence');
            $table->dropColumn('emission');
        });
    }
}
