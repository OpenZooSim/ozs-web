import { Router } from 'express';

export class BaseRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
    }
}
