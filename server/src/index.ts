import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import { lists } from './assets/mockData';
import { Database } from './data/database';
import { CardHandler } from './handlers/card.handler';
import { ListHandler } from './handlers/list.handler';
import { ReorderService } from './services/reorder.service';
import { LoggerObserver } from './logger/observer';
import { ConsoleLoggerSubscriber } from './logger/console-logger';
import { FileLoggerSubscriber } from './logger/file-logger';
import { CardHandlerProxy } from './handlers/card.handler.proxy';
import { ListHandlerProxy } from './handlers/list.handler.proxy';

const PORT = 3001;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const db = Database.Instance;
const reorderService = new ReorderService();

// PATTERN:{Observer}
const logger = new LoggerObserver();
logger.addObserver(new ConsoleLoggerSubscriber());
logger.addObserver(new FileLoggerSubscriber('./log.log'));

if (process.env.NODE_ENV !== 'production') {
    db.setData(lists);
}

// PATTERN:{Proxy}
const onConnection = (socket: Socket): void => {
    new ListHandlerProxy(io, db, reorderService, logger, new ListHandler(io, db, reorderService)).handleConnection(
        socket
    );
    new CardHandlerProxy(io, db, reorderService, logger, new CardHandler(io, db, reorderService)).handleConnection(
        socket
    );
};

io.on('connection', onConnection);

httpServer.listen(PORT, () => console.log('listening on port: ' + PORT));

export { httpServer };
