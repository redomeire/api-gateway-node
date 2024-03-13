import express, { json, urlencoded, static as expressStatic } from 'express';
import { createServer } from 'http';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import debug from 'debug'

// dirname resolver
import path from 'path';
import {fileURLToPath} from 'url';

// routes
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import courseRouter from './routes/course';
import mediaRouter from './routes/media';
import memberRouter from './routes/member';
import orderRouter from './routes/order';
import paymentRouter from './routes/payment';
import { verifyToken } from './middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expressDebug = debug('api-gateway:server');
const app = express();

app.use(logger('dev'));
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/course', verifyToken, courseRouter);
app.use('/media', mediaRouter);
app.use('/member', memberRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);

let port = normalizePort(process.env.PORT || '3000');

/**
 * Create HTTP server.
 */

var server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
    expressDebug('Listening on ' + bind);
}

export default app;
