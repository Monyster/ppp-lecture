import type { Server, Socket } from 'socket.io';
import { ListEvent } from '../common/enums';
import { List } from '../data/models/list';
import { SocketHandler } from './socket.handler';
import { LogLevel, LoggerObserver } from '../logger/observer'; // Adjust the import path accordingly
import { Database } from '../data/database';
import { ReorderService } from '../services/reorder.service';
import { ListHandler } from './list.handler';

// PATTERN:{Proxy}
export class ListHandlerProxy extends SocketHandler {
    private listHandler: ListHandler;
    private logger: LoggerObserver;

    constructor(
        io: Server,
        db: Database,
        reorderService: ReorderService,
        logger: LoggerObserver,
        listHandler: ListHandler
    ) {
        super(io, db, reorderService);
        this.logger = logger;
        this.listHandler = listHandler;
    }

    public handleConnection(socket: Socket): void {
        try {
            socket.on(ListEvent.CREATE, this.createList.bind(this));
            socket.on(ListEvent.DELETE, this.deleteList.bind(this));
            socket.on(ListEvent.RENAME, this.renameList.bind(this));
            socket.on(ListEvent.GET, this.getLists.bind(this));
            socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
            this.logger.log(LogLevel.INFO, 'handleConnection');
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `handleConnection - ${error.message}`);
        }
    }

    private getLists(callback: (lists: List[]) => void): void {
        try {
            this.listHandler.getLists(callback);
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `getLists - ${error.message}`);
        }
    }

    private reorderLists(sourceIndex: number, destinationIndex: number): void {
        try {
            this.listHandler.reorderLists(sourceIndex, destinationIndex);
            this.logger.log(
                LogLevel.INFO,
                `reorderLists - sourceIndex:${sourceIndex} - destinationIndex:${destinationIndex}`
            );
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `reorderLists - ${error.message}`);
        }
    }

    private createList(name: string): void {
        try {
            this.listHandler.createList(name);
            this.logger.log(LogLevel.INFO, `createList - name:${name}`);
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `createList - ${error.message}`);
        }
    }

    private deleteList(listId: string): void {
        try {
            this.listHandler.deleteList(listId);
            this.logger.log(LogLevel.INFO, `deleteList - listId:${listId}`);
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `deleteList - ${error.message}`);
        }
    }

    private renameList(listId: string, newName: string): void {
        try {
            this.listHandler.renameList(listId, newName);
            this.logger.log(LogLevel.INFO, `renameList - listId:${listId} - newName:${newName}`);
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `renameList - ${error.message}`);
        }
    }
}
