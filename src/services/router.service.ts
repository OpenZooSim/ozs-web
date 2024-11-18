import { singleton } from 'tsyringe';
import { HealthRouter } from '../routers/health.router';
import { Router } from 'express';
import { AuthRouter } from '../routers/auth.router';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { UIRouter } from '../routers/ui.router';

@singleton()
export class RouterService {
    constructor(
        private readonly _healthRouter: HealthRouter,
        private readonly _uiRouter: UIRouter,
        private readonly _authRouter: AuthRouter
    ) {}

    public InitializeRouters() {
        const router = Router();

        // Forward cookies to headers for easier access
        router.use((req, _res, next) => {
            if (req.cookies['access_token']) {
                req.headers['Authorization'] =
                    `Bearer ${req.cookies['access_token']}`;
            }
            if (req.cookies['refresh_token']) {
                req.headers['x-refresh-token'] = req.cookies['refresh_token'];
            }
            next();
        });

        // Mixed Auth Routers

        router.use('/health', this._healthRouter.Router);
        router.use('/', this._uiRouter.Router);
        router.use('/api/auth', this._authRouter.Router);

        // Full Auth Routers
        router.use(AuthMiddleware.Authorize);

        return router;
    }
}
