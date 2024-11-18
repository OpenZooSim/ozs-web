import { BaseRouter } from './base.router';
import { Request, Response, NextFunction } from 'express';
import { singleton } from 'tsyringe';

@singleton()
export class UIRouter extends BaseRouter {
    constructor() {
        super();
        this._buildRoutes();
    }

    private _getHome(_req: Request, res: Response, _next: NextFunction) {
        res.render('index', { title: 'OPENZOOSIM' });
    }

    private _buildRoutes() {
        this.Router.get('/', this._getHome.bind(this));
    }
}
