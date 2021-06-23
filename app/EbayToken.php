<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EbayToken extends Model
{
    protected $table = 'ebay_token';
    protected $fillable = ['name', 'value'];

}
