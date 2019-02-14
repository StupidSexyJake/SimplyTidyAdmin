import React from 'react'
import Head from 'next/head'
// Business data

export default React.memo(function (props) {
    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
                <meta name="description" content={props.metaDescription}></meta>
                <title>{props.title} | Gold Coast Maids </title>
                <link href="https://fonts.googleapis.com/css?family=Montserrat%7COswald:400" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500" rel="stylesheet" />
                <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
            </Head>
        </React.Fragment>
    )
})