import express, { ErrorRequestHandler } from 'express';
import * as ENV from './env';
import mongoose from 'mongoose';
import { categoriesRouter, goalsRouter } from './routes';

const app = express();

const main = async () => {
  // connect to mongo
  await mongoose.connect(ENV.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // --- setup express ---

  // config
  app.use(express.json());

  // routes
  app.use('/goals', goalsRouter);
  app.use('/categories', categoriesRouter);

  // 404
  app.use((req, res) => {
    res.status(404).json({ message: 'nothing here' });
  });

  // error
  app.use(((err, req, res, next) => {
    console.log(err);

    if (err.isCustom) {
      const { statusCode, isCustom, ...rest } = err;
      res.status(statusCode).json(rest);
      return;
    }

    res.status(500).json({ message: 'oops, something went wrong' });
  }) as ErrorRequestHandler);

  // start
  app.listen(ENV.PORT, () => {
    console.log(`server started on port ${ENV.PORT}`);
  });
};

main();