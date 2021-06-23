<?php

namespace App\Http\Controllers;

use App\EbayToken;
use GuzzleHttp\Client;
use Illuminate\Http\Request;


class EbayTokenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EbayToken::where('name', 'eBayAuthToken')->first();
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $AppID = EbayToken::where('name','AppID')->first();
        $DevID = EbayToken::where('name','DevID')->first();
        $CertID = EbayToken::where('name','CertID')->first();
        $SessionID = EbayToken::where('name','sessionId')->first();

        $client = new Client();

        $result = $client->post('https://api.ebay.com/ws/api.dll', 
        [ 
            'headers' =>  ['X-EBAY-API-SITEID' => '3',
            'X-EBAY-API-COMPATIBILITY-LEVEL' => '967',
            'X-EBAY-API-CALL-NAME' => 'FetchToken',
            'X-EBAY-API-APP-NAME' => $AppID->value,
            'X-EBAY-API-DEV-NAME' => $DevID->value,
            'X-EBAY-API-CERT-NAME' => $CertID->value],

            'body' => '<?xml version="1.0" encoding="utf-8"?>
            <FetchTokenRequest xmlns="urn:ebay:apis:eBLBaseComponents">
                <ErrorLanguage>en_US</ErrorLanguage>
                <WarningLevel>High</WarningLevel>
               <!-- Enter the SessionID created for the user for whom the token needs to be retrieved -->
             <SessionID>'.$SessionID->value.'</SessionID>
            </FetchTokenRequest>'
        ]);
       
        $xml = simplexml_load_string($result->getBody());
        $json = json_encode($xml);
        EbayToken::updateOrCreate([
            'name' => 'eBayAuthToken'
        ],
        [ 
        'value' => $xml->eBayAuthToken]
        );

        return $json;
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
