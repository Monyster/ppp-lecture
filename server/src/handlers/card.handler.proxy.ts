import { Server, Socket } from 'socket.io';
import { CardEvent } from '../common/enums';
import { LogLevel, LoggerObserver } from '../logger/observer';
import { SocketHandler } from './socket.handler';
import { CardHandler } from './card.handler';
import { Database } from '../data/database';
import { ReorderService } from '../services/reorder.service';

// PATTERN:{Proxy}
export class CardHandlerProxy extends SocketHandler {
    private cardHandler: CardHandler;
    private logger: LoggerObserver;

    constructor(
        io: Server,
        db: Database,
        reorderService: ReorderService,
        logger: LoggerObserver,
        cardHandler: CardHandler
    ) {
        super(io, db, reorderService);
        this.logger = logger;
        this.cardHandler = cardHandler;
    }

    public handleConnection(socket: Socket): void {
        try {
            socket.on(CardEvent.CREATE, this.createCard.bind(this));
            socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
            socket.on(CardEvent.RENAME, this.renameCard.bind(this));
            socket.on(CardEvent.CHANGE_DESCRIPTION, this.descriptionCard.bind(this));
            socket.on(CardEvent.DUPLICATE, this.duplicateCard.bind(this));
            socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
            this.logger.log(LogLevel.INFO, 'handleConnection');
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `handleConnection - ${error.message}`);
        }
    }

    public createCard(listId: string, cardName: string): void {
        try {
            this.cardHandler.createCard(listId, cardName);
            this.logger.log(LogLevel.INFO, `createCard - listId:${listId} - cardName:${cardName}`);
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `createCard - ${error.message}`);
        }
    }

    public deleteCard(listId: string, cardId: string): void {
        try {
            this.cardHandler.deleteCard(listId, cardId);
            this.logger.log(LogLevel.INFO, `deleteCard - listId:${listId} - cardId:${cardId}`);
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `deleteCard - ${error.message}`);
        }
    }

    public renameCard(listId: string, cardId: string, newCardName: string): void {
        try {
            this.cardHandler.renameCard(listId, cardId, newCardName);
            this.logger.log(
                LogLevel.INFO,
                `renameCard - listId:${listId} - cardId:${cardId} - newCardName:${newCardName}`
            );
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `renameCard - ${error.message}`);
        }
    }

    public descriptionCard(listId: string, cardId: string, newDescription: string): void {
        try {
            this.cardHandler.descriptionCard(listId, cardId, newDescription);
            this.logger.log(
                LogLevel.INFO,
                `descriptionCard - listId:${listId} - cardId:${cardId} - newDescription:${newDescription}`
            );
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `descriptionCard - ${error.message}`);
        }
    }

    public duplicateCard(listId: string, cardId: string): void {
        try {
            this.cardHandler.duplicateCard(listId, cardId);
            this.logger.log(LogLevel.INFO, `duplicateCard - listId:${listId} - cardId:${cardId}`);
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `duplicateCard - ${error.message}`);
        }
    }

    private reorderCards({
        sourceIndex,
        destinationIndex,
        sourceListId,
        destinationListId,
    }: {
        sourceIndex: number;
        destinationIndex: number;
        sourceListId: string;
        destinationListId: string;
    }): void {
        try {
            this.cardHandler.reorderCards({
                sourceIndex,
                destinationIndex,
                sourceListId,
                destinationListId,
            });
            this.logger.log(
                LogLevel.INFO,
                `reorderCards - sourceIndex:${sourceIndex} - destinationIndex:${destinationIndex} - sourceListId:${sourceListId} - destinationListId:${destinationListId}`
            );
        } catch (error) {
            this.logger.log(LogLevel.ERROR, `reorderCards - ${error.message}`);
        }
    }
}
