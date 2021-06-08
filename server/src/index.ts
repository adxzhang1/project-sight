import express from 'express';
import * as ENV from './env'

const app = express();

const main = async () => {
  app.use((req, res) => {
    res.status(404).json({message: 'nothing here'})
  })

  app.listen(ENV.PORT, () => {
    console.log(`server started on port ${ENV.PORT}`)
  })
}

main();