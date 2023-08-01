import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';
import React from 'react';

import { Card } from '../../../common/types';
import { CardItem } from '../../card-item/card-item';

type Props = {
    cards: Card[];
    onDeleteCard: (cardId: string) => void;
    onRenameCard: (cardId: string, newCardName: string) => void;
};

const Cards = ({ cards, onDeleteCard, onRenameCard }: Props) => (
    <React.Fragment>
        {cards.map((card: Card, index: number) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
                {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                    <CardItem
                        key={card.id}
                        card={card}
                        isDragging={dragSnapshot.isDragging}
                        provided={dragProvided}
                        onDelete={onDeleteCard}
                        onRename={onRenameCard}
                    />
                )}
            </Draggable>
        ))}
    </React.Fragment>
);

export { Cards };
