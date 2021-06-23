<?php

namespace App\Http\Controllers;

use App\EbayToken;
use GuzzleHttp\Client;
use Illuminate\Http\Request;


class EbaySessionIdController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return EbayToken::where('name', 'ebay_token')->first();
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $RuName = EbayToken::where('name','RuName')->first();
        $AppID = EbayToken::where('name','AppID')->first();
        $DevID = EbayToken::where('name','DevID')->first();
        $CertID = EbayToken::where('name','CertID')->first();

        $client = new Client();

        $result = $client->post('https://api.ebay.com/ws/api.dll', 
        [ 
            'headers' =>  ['X-EBAY-API-SITEID' => '3',
            'X-EBAY-API-COMPATIBILITY-LEVEL' => '967',
            'X-EBAY-API-CALL-NAME' => 'GetSessionID',
            'X-EBAY-API-APP-NAME' => $AppID->value,
            'X-EBAY-API-DEV-NAME' => $DevID->value,
            'X-EBAY-API-CERT-NAME' => $CertID->value],
            
            'body' => '<?xml version="1.0" encoding="utf-8"?>
            <GetSessionIDRequest xmlns="urn:ebay:apis:eBLBaseComponents">    
                <ErrorLanguage>en_US</ErrorLanguage>
                <WarningLevel>High</WarningLevel>
              <RuName>'.$RuName->value.'</RuName>
            </GetSessionIDRequest>'
        ]);
       
        $xml = simplexml_load_string($result->getBody());
        EbayToken::updateOrCreate([
          'name' => 'sessionId'
        ],
       [ 
        'value' => $xml->SessionID]
      );
        return $xml->SessionID;
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
}
