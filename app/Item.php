<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['title', 'ebay_item_id', 'sku', 'quantity', 'price'];
}
