import dotenv from "dotenv";
import log4js from "log4js";
import { useExpressServer } from 'routing-controllers';
import { UserController } from './controller/user-controller';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import { GlobalErrorHandlers } from './middleware/global-error-handlers';

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;
const port = process.env.PORT;

const app: Express = express();
app.use(bodyParser.json());  // BodyParser отвечает за распознование тела запроса
app.use(httpContext.middleware);

useExpressServer(app, {
	controllers: [UserController],
	middlewares: [GlobalErrorHandlers],
	defaultErrorHandler: false // Введен собственный обработчик ошибок (глобальный).
})

// app.use((req, res, next) => {
// 	httpContext.ns.bindEmitter(req);
// 	httpContext.ns.bindEmitter(res);
// });

app.listen(port, () => console.log(`Running on port ${port}`));