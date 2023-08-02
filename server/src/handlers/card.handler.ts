import type { Socket } from 'socket.io';

import { CardEvent } from '../common/enums';
import { Card } from '../data/models/card';
import { SocketHandler } from './socket.handler';

export class CardHandler extends SocketHandler {
    public handleConnection(socket: Socket): void {
        socket.on(CardEvent.CREATE, this.createCard.bind(this));
        socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
        socket.on(CardEvent.RENAME, this.renameCard.bind(this));
        socket.on(CardEvent.CHANGE_DESCRIPTION, this.descriptionCard.bind(this));
        socket.on(CardEvent.DUPLICATE, this.duplicateCard.bind(this));
        socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    }

    public createCard(listId: string, cardName: string): void {
        const newCard = new Card(cardName, '');
        const lists = this.db.getData();

        const updatedLists = lists.map((list) =>
            list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
        );

        this.db.setData(updatedLists);
        this.updateLists();
    }

    public deleteCard(listId: string, cardId: string): void {
        const lists = this.db.getData();

        const listToUpdate = lists.find((list) => list.id === listId);
        listToUpdate.cards = listToUpdate.cards.filter((card) => card.id !== cardId);

        this.db.setData(lists);
        this.updateLists();
    }

    public renameCard(listId: string, cardId: string, newCardName: string): void {
        const lists = this.db.getData();

        const listToUpdate = lists.find((list) => list.id === listId);
        listToUpdate.cards = listToUpdate.cards.map((card) => {
            if (card.id === cardId) {
                card.name = newCardName;
                return card;
            }

            return card;
        });

        this.db.setData(lists);
        this.updateLists();
    }

    public descriptionCard(listId: string, cardId: string, newDescription: string): void {
        const lists = this.db.getData();

        const listToUpdate = lists.find((list) => list.id === listId);
        listToUpdate.cards = listToUpdate.cards.map((card) => {
            if (card.id === cardId) {
                card.description = newDescription;
                return card;
            }

            return card;
        });

        this.db.setData(lists);
        this.updateLists();
    }

    public duplicateCard(listId: string, cardId: string): void {
        const lists = this.db.getData();

        const list = lists.find((list) => list.id === listId);

        const cardToDuplicate = list.cards.find((card) => card.id === cardId);
        const cardClone = cardToDuplicate.clone();

        const updatedLists = lists.map((list) =>
            list.id === listId ? list.setCards(list.cards.concat(cardClone)) : list
        );

        this.db.setData(updatedLists);

        this.db.setData(lists);
        this.updateLists();
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
        const lists = this.db.getData();
        const reordered = this.reorderService.reorderCards({
            lists,
            sourceIndex,
            destinationIndex,
            sourceListId,
            destinationListId,
        });
        this.db.setData(reordered);
        this.updateLists();
    }
}
