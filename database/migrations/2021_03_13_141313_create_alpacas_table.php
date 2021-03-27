<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlpacasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alpacas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('age');
            $table->timestamp('user_created_at')->nullable();
            $table->string('gender');
            $table->integer('happiness');
            $table->integer('hunger');
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
        Schema::dropIfExists('alpacas');
    }
}
