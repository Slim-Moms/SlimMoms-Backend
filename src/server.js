import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/indexRouter.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //! To check the server is running or not
  app.get('/', (request, response) => {
    response.send('Server running successfully');
  });
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  app.use(router);

  //! 404 Handling
  app.use(notFoundHandler);

  //! Error Handling
  app.use(errorHandler);
};
