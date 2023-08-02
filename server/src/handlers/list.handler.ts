import type { Socket } from 'socket.io';

import { ListEvent } from '../common/enums';
import { List } from '../data/models/list';
import { SocketHandler } from './socket.handler';

export class ListHandler extends SocketHandler {
    public handleConnection(socket: Socket): void {
        socket.on(ListEvent.CREATE, this.createList.bind(this));
        socket.on(ListEvent.DELETE, this.deleteList.bind(this));
        socket.on(ListEvent.RENAME, this.renameList.bind(this));
        socket.on(ListEvent.GET, this.getLists.bind(this));
        socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    }

    public getLists(callback: (cards: List[]) => void): void {
        callback(this.db.getData());
    }

    public reorderLists(sourceIndex: number, destinationIndex: number): void {
        const lists = this.db.getData();
        const reorderedLists = this.reorderService.reorder(lists, sourceIndex, destinationIndex);
        this.db.setData(reorderedLists);
        this.updateLists();
    }

    public createList(name: string): void {
        const lists = this.db.getData();
        const newList = new List(name);
        this.db.setData(lists.concat(newList));
        this.updateLists();
    }

    public deleteList(listId: string): void {
        const lists = this.db.getData();
        const newLists = lists.filter((list) => list.id !== listId);

        this.db.setData(newLists);
        this.updateLists();
    }

    public renameList(listId: string, newName: string): void {
        const lists = this.db.getData();

        const newLists = lists.map((list) => {
            if (list.id === listId) {
                list.name = newName;
                return list;
            }

            return list;
        });

        this.db.setData(newLists);
        this.updateLists();
    }
}
