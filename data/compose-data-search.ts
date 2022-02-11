/**
 * @title Compose hyper data and search
 * @difficulty beginner
 * @tags cli, deploy, web
 * @run <url>
 * @resource {https://dashboard.hyper.io} Hyper Cloud Dashboard
 * @resource {https://docs.hyper.io/cloud/applications} Hyper Applications
 * @resource {https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application} Creating a New Hyper Application
 * @resource {https://docs.hyper.io/cloud/app-keys} App Keys and Connection Strings
 * 
 */

// - See Additional Resources at the bottom of this page for assistance setting up.

// - Create a hyper app service with the dashboard 

// - Sign in with your github account and create a new hyper application and a data service.

// - Copy the connection string and place it in a .env file

// import hyper connect
import { connect } from 'https://x.nest.land/hyper-connect@0.1.14/deno/mod.ts'

// load.ts automatically loads the local .env file on import and exports it to the process environment
import "https://deno.land/x/dotenv/load.ts";

// connect to hyper by passing the HYPER environment variable
const hyper = connect(Deno.env.get('HYPER') as string)

// add a JSON document to the hyper data service instance for your hyper app.
const result = await hyper.data.add({ id: "game-2", type: "game", name: "Defender" });

console.log(result)

