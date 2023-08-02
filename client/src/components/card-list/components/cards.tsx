import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';
import React from 'react';

import { Card } from '../../../common/types';
import { CardItem } from '../../card-item/card-item';

type Props = {
    cards: Card[];
    onDeleteCard: (cardId: string) => void;
    onRenameCard: (cardId: string, newCardName: string) => void;
    onChangeDescriptionCard: (cardId: string, newCardDescription: string) => void;
    handleDuplicateCard: (cardId: string) => void;
};

const Cards = ({ cards, onDeleteCard, onRenameCard, onChangeDescriptionCard, handleDuplicateCard }: Props) => (
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
                        onChangeDescription={onChangeDescriptionCard}
                        onDuplicate={handleDuplicateCard}
                    />
                )}
            </Draggable>
        ))}
    </React.Fragment>
);

export { Cards };
