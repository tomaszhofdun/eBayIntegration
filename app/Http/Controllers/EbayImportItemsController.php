<?php

namespace App\Http\Controllers;

use App\EbayToken;
use App\Item;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;


class EbayImportItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\EbayToken  $ebayToken
     * @return \Illuminate\Http\Response
     */
    public function show(EbayToken $ebayToken)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EbayToken  $ebayToken
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EbayToken $ebayToken)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EbayToken  $ebayToken
     * @return \Illuminate\Http\Response
     */
    public function destroy(EbayToken $ebayToken)
    {
        //
    }
    public function import(Request $request)
    {
        $eBayAuthToken = EbayToken::where('name','eBayAuthToken')->first();


        $client = new Client();

        $result = $client->post('https://api.ebay.com/ws/api.dll', 
        [ 
            'headers' =>  ['X-EBAY-API-SITEID' => '3',
            'X-EBAY-API-COMPATIBILITY-LEVEL' => '967',
            'X-EBAY-API-CALL-NAME' => 'GetMyeBaySelling'],

            'body' => '<?xml version="1.0" encoding="utf-8"?>
            <GetMyeBaySellingRequest xmlns="urn:ebay:apis:eBLBaseComponents">
              <RequesterCredentials>
                <eBayAuthToken>'.$eBayAuthToken->value.'</eBayAuthToken>
              </RequesterCredentials>
              <ErrorLanguage>en_US</ErrorLanguage>
              <WarningLevel>High</WarningLevel>
              <ActiveList>
                <Sort>ItemID</Sort>
                <Pagination>
                  <EntriesPerPage>200</EntriesPerPage>
                  <PageNumber>1</PageNumber>
                </Pagination>
              </ActiveList>
            </GetMyeBaySellingRequest>'
        ]);
       
        $xml = simplexml_load_string($result->getBody());
        
        return json_encode($xml);
    }
    public function save(Request $request)
    {
      
      try {
   
      $items = $request->all();

      foreach ($items['items'] as $key) {

        $resp = Item::create([
          'title' => $key['Title'], 
          'ebay_item_id' =>$key['ItemID'], 
          'sku' =>$key['SKU'], 
          'quantity' =>$key['QuantityAvailable'], 
          'price' =>$key['BuyItNowPrice']
        ]);
        
      }

      if(boolval($resp)) {
        return "Success";
      }
      else {
        return "Fail";
      }


    } catch (Exception  $ex) {
        return $ex;
    }

    }
}
