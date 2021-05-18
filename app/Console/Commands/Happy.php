<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Alpacas;

class Happy extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'alpaca:happy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Minuses happy to all Alpacas';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $alpacas = Alpacas::all();
        foreach ($alpacas as $alpaca) {
            $alpaca->happiness = ($alpaca->happiness - 5 >= 5)? $alpaca->happiness - 5: 5;
            $alpaca->save();
        }
    }
}
