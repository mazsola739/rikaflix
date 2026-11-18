import { createApp } from './app'
import { config } from './config'
import { createShowRepository } from './repositories/showRepository'

const repository = createShowRepository(config.dataFile)
const app = createApp(repository, config.corsOrigin)

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}/api (${repository.findAll().length} shows loaded)`)
})
