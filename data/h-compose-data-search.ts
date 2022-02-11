/**
 * @title Composing hyper data and search
 * @difficulty beginner
 * @tags data, search, composition
 * @run <url>
 * @resource {https://deno.land/#installation} Deno: Installation
 * @resource {https://deno.land/manual@v1.17.2/getting_started/setup_your_environment} Manual: Set up your environment
 */

// To create a hyper app service in the cloud, go to https://dashboard.hyper.io 
//  sign in with your github account and create a new application. 
//  When you create your new application, copy the connection string and place it in a .env file

// import hyper connect

import { connect } from 'https://x.nest.land/hyper-connect@0.1.14/deno/mod.ts'

const hyper = connect(Deno.env.get('HYPER'))

const result = await hyper.data.add({ id: "game-1", type: "game", name: "Donkey Kong" });

console.log(result)

// Deno programs can either be written in JavaScript or TypeScript, or a mixture
// of both. All code in these examples is written in TypeScript, but all the
// examples also work in JavaScript.
