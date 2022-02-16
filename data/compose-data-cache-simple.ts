/**
 * @title Compose hyper data and cache
 * @difficulty beginner
 * @tags cli, deploy, web
 * @run --allow-read --allow-env --allow-net <url>
 * @resource {https://dashboard.hyper.io} hyper cloud dashboard
 * @resource {https://docs.hyper.io/cloud/applications} hyper applications
 * @resource {https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application} Creating a new hyper application
 * @resource {https://docs.hyper.io/cloud/app-keys} App keys and connection strings
 * @resource {https://docs.hyper.io/cloud/data-api} hyper data API
 * @resource {https://docs.hyper.io/cloud/cache-api} hyper cache API
 */
// deno-lint-ignore-file no-explicit-any

// import hyper connect
import { connect } from 'https://x.nest.land/hyper-connect@0.1.14/deno/mod.ts'

// load.ts automatically loads the local .env file on import and exports it to the process environment.
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

// connect to hyper by passing the HYPER environment variable.  
// Copy your hyper app's connection string and place it in a .env file
// See Additional Resources for assistance.
const hyper = connect(Deno.env.get('HYPER') as string)

interface ErrorResponse {
  ok: boolean;
  err: any;
}

interface AddResponse {
  ok: boolean
}

interface Game {
  _id: string;
  type: string; 
  name: string; 
}

interface GamesListResult {
  ok: boolean;
  docs: Array<Game>;
}

type Unknown = unknown;

// passValueThru is a helper function that logs the incoming value and returns the same value.
const passValueThru = (x: any) => {
  console.log('passValueThru:', x)
  return x
}

// addDocToDB is a helper function that takes a document, adds a document to the hyper data service and if all goes well, returns the doc down the chain.  
// This way we can cache the doc later in the addDocToCache function.
// If the database has a problem with the doc, such as a document conflict, we Promise.reject.
const addGameToDB = (game: Game) =>
  hyper.data.add(game).then((res: AddResponse) => {
    console.log('addDocToDB res', res, game)
    return res.ok ? game : Promise.reject(res)
  })

// addDocToCache is a helper function that takes a document,
//  and adds the doc to the cache service with an expire date (ttl) of 1 day.
//  Whatever happens, we pass the result down the chain
const addGameToCache = (game: Game) =>
  hyper.cache.add(game._id, game, '1d')

// returnErrorResponse is a helper function that takes an error,
//  and returns a consistenly shaped ErrorResponse
function returnErrorResponse (err: any) : ErrorResponse {
  console.log('returnErrorResponse', {
    ok: false, err
  })
 return {
    ok: false, err
  }
}

// addDocAndCache process a document through a promise chain.
// The doc is added to the data service then cached. 
// If an error occurs, an consistent error is formatted and returned.
const addDocAndCache = (game: Game) =>
  Promise.resolve(game)
    .then(addGameToDB)
    .then(addGameToCache, passValueThru)
    .then(passValueThru)
    .catch(returnErrorResponse)

const result = await addDocAndCache({ _id: "game-12", type: "game", name: "Lunar Lander" })
console.log(result)

// lists the docs in the data service
const listGames = (): GamesListResult | Unknown  => hyper.data.list({limit:100})

const games = await listGames()

console.log(games)