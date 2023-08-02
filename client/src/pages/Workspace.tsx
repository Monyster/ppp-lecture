import type { DraggableLocation, DroppableProvided, DropResult } from '@hello-pangea/dnd';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import React, { useContext, useEffect, useState } from 'react';

import { CardEvent, ListEvent } from '../common/enums';
import type { List } from '../common/types';
import { Column } from '../components/column/column';
import { ColumnCreator } from '../components/column-creator/column-creator';
import { SocketContext } from '../context/socket';
import { reorderService } from '../services/reorder.service';
import { Container } from './styled/container';

export const Workspace = () => {
    const [lists, setLists] = useState<List[]>([]);

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit(ListEvent.GET, (lists: List[]) => setLists(lists));
        socket.on(ListEvent.UPDATE, (lists: List[]) => setLists(lists));

        return () => {
            socket.removeAllListeners(ListEvent.UPDATE).close();
        };
    }, []);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const source: DraggableLocation = result.source;
        const destination: DraggableLocation = result.destination;

        const isNotMoved = source.droppableId === destination.droppableId && source.index === destination?.index;

        if (isNotMoved) {
            return;
        }

        const isReorderLists = result.type === 'COLUMN';

        if (isReorderLists) {
            setLists(reorderService.reorderLists(lists, source.index, destination.index));
            socket.emit(ListEvent.REORDER, source.index, destination.index);

            return;
        }

        setLists(reorderService.reorderCards(lists, source, destination));
        socket.emit(CardEvent.REORDER, {
            sourceListId: source.droppableId,
            destinationListId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
        });
    };

    const onCreateList = (name: string) => {
        socket.emit(ListEvent.CREATE, name);
    };

    const onDeleteList = (listId: string) => {
        socket.emit(ListEvent.DELETE, listId);
    };

    const onRenameList = (listId: string, newName: string) => {
        socket.emit(ListEvent.RENAME, listId, newName);
    };

    const onCreateCard = (listId: string, cardName: string) => {
        socket.emit(CardEvent.CREATE, listId, cardName);
    };

    const onDeleteCard = (listId: string, cardId: string) => {
        socket.emit(CardEvent.DELETE, listId, cardId);
    };

    const onRenameCard = (listId: string, cardId: string, newCardName: string) => {
        socket.emit(CardEvent.RENAME, listId, cardId, newCardName);
    };

    const onDescriptionCard = (listId: string, cardId: string, newCardDescription: string) => {
        socket.emit(CardEvent.CHANGE_DESCRIPTION, listId, cardId, newCardDescription);
    };

    const onDuplicateCard = (listId: string, cardId: string) => {
        socket.emit(CardEvent.DUPLICATE, listId, cardId);
    };

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                    {(provided: DroppableProvided) => (
                        <Container className="workspace-container" ref={provided.innerRef} {...provided.droppableProps}>
                            {lists.map((list: List, index: number) => (
                                <Column
                                    key={list.id}
                                    index={index}
                                    listName={list.name}
                                    cards={list.cards}
                                    listId={list.id}
                                    onDeleteList={onDeleteList}
                                    onRenameList={onRenameList}
                                    onCreateCard={onCreateCard}
                                    onDeleteCard={onDeleteCard}
                                    onRenameCard={onRenameCard}
                                    onDescriptionCard={onDescriptionCard}
                                    onDuplicateCard={onDuplicateCard}
                                />
                            ))}
                            {provided.placeholder}
                            <ColumnCreator onCreateList={onCreateList} />
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        </React.Fragment>
    );
};
