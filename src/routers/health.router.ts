import { BaseRouter } from './base.router';
import { Request, Response, NextFunction } from 'express';
import { singleton } from 'tsyringe';

@singleton()
export class HealthRouter extends BaseRouter {
    constructor() {
        super();
        this._buildRoutes();
    }

    private _getHealthCheck(_req: Request, res: Response, _next: NextFunction) {
        res.send('ok');
    }

    private _buildRoutes() {
        this.Router.get('/', this._getHealthCheck.bind(this));
    }
}
