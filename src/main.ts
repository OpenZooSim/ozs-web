import 'reflect-metadata';
import { container } from 'tsyringe';
import { AppServer } from './app-server';

const bootstrap = async () => {
    const appServer = container.resolve(AppServer);
    await appServer.Start();
    console.log('Server is listening on port 3000...');
};

process.on('uncaughtException', (e) => {
    console.error(e.message);
});

process.on('unhandledRejection', () => {
    console.error(
        "An unhandled rejection was observed. This shouldn't happen!"
    );
});

bootstrap().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
