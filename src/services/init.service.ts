import { singleton } from 'tsyringe';
import { Database } from '../database/database.context';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { RouterService } from './router.service';
import { ErrorHandlerMiddleware } from '../middleware/error-handler.middleware';

@singleton()
export class InitService {
    constructor(
        private readonly _dbContext: Database,
        private readonly _routerService: RouterService
    ) {}

    /**
     * PreInit is called before the server starts.
     */
    public PreInit(app: express.Application) {
        app.use(express.json());
        app.use(
            express.urlencoded({
                extended: true,
            })
        );
        app.use(helmet());
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.set('views', './views');
        app.use('/public', express.static('public'));
    }

    /**
     * Init is called while the server is starting.
     */
    public async Init(app: express.Application) {
        await this._dbContext.Initialize();
        app.use(this._routerService.InitializeRouters());
        app.use(ErrorHandlerMiddleware.HandleErrors);
    }
}
