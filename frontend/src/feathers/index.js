const SERVER_URL = 'http://localhost:3030'

const feathers = require('@feathersjs/feathers')
const rest = require('@feathersjs/rest-client')
const auth = require('@feathersjs/authentication-client')

const app = feathers()

const restClient = rest(SERVER_URL)

app.configure(restClient.fetch(window.fetch.bind(window)))

app.configure(auth({
  storageKey: 'jwt'
}))

export default app
