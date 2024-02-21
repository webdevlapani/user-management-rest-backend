import { response, responseHandler } from 'api/v1/helpers';
import routes from 'api/v1/routes';
import { MAX_FILE_SIZE } from 'config';
import { connectDb } from 'config/db';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';

dotenv.config();

const app: Express = express();

const port = process.env.PORT;

connectDb()
  .then(() => {
    app.use(express.json());

    app.use(fileUpload({ limits: { fileSize: MAX_FILE_SIZE } }));

    app.use('/api/v1', routes);

    //* Catch HTTP 404
    app.use((_req: Request, res: Response, next: NextFunction) => {
      next(responseHandler(res, response.recordNotFound({})));
    });

    //* Error Handler
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      return responseHandler(res, response.internalServerError({ message: err.message }));
    });

    app.listen(port, () => {
      console.log(`⚡️ Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
