import type { DraggableLocation } from '@hello-pangea/dnd';

import { Card, List } from '../common/types';

function reorderLists(items: List[], startIndex: number, endIndex: number): List[] {
    const reorderedItems = [...items];
    const [removed] = reorderedItems.splice(startIndex, 1);
    reorderedItems.splice(endIndex, 0, removed);

    return reorderedItems;
}

function removeCardFromList(cards: Card[], index: number): Card[] {
    return cards.slice(0, index).concat(cards.slice(index + 1));
}

function addCardToList(cards: Card[], index: number, card: Card): Card[] {
    return cards.slice(0, index).concat(card).concat(cards.slice(index));
}

function reorderCards(lists: List[], source: DraggableLocation, destination: DraggableLocation): List[] {
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destinationList = lists.find((list) => list.id === destination.droppableId);

    if (!sourceList || !destinationList) {
        return lists;
    }

    const current = sourceList.cards || [];
    const next = destinationList.cards || [];
    const target = current[source.index];

    const isMovingInSameList = source.droppableId === destination.droppableId;

    if (isMovingInSameList) {
        const reorderedCurrent = [...current];
        const [removed] = reorderedCurrent.splice(source.index, 1);
        reorderedCurrent.splice(destination.index, 0, removed);

        return lists.map((list) => (list.id === source.droppableId ? { ...list, cards: reorderedCurrent } : list));
    }

    const newLists = lists.map((list) => {
        if (list.id === source.droppableId) {
            return {
                ...list,
                cards: removeCardFromList(current, source.index),
            };
        }

        if (list.id === destination.droppableId) {
            return {
                ...list,
                cards: addCardToList(next, destination.index, target),
            };
        }

        return list;
    });

    return newLists;
}

export { reorderLists, reorderCards };
