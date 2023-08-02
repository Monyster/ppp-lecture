import type { DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import { Droppable } from '@hello-pangea/dnd';
import { CSSProperties } from 'react';

import type { Card } from '../../common/types';
import { List } from './components/list';
import { ListWrapper } from './styled/list-wrapper';
import { ScrollContainer } from './styled/scroll-container';

type Props = {
    listId: string;
    listType: string;
    cards: Card[];
    style: CSSProperties;
    onDeleteCard: (listId: string, cardId: string) => void;
    onRenameCard: (listId: string, cardId: string, newCardName: string) => void;
    onDescriptionCard: (listId: string, cardId: string, newCardDescription: string) => void;
    onDuplicateCard: (listId: string, cardId: string) => void;
};

const CardsList = ({
    listId,
    listType,
    style,
    cards,
    onDeleteCard,
    onRenameCard,
    onDescriptionCard,
    onDuplicateCard,
}: Props) => {
    const handleDeleteCard = (cardId: string) => {
        onDeleteCard(listId, cardId);
    };

    const handleRenameCard = (cardId: string, newCardName: string) => {
        onRenameCard(listId, cardId, newCardName);
    };

    const handleDescriptionCard = (cardId: string, newCardDescription: string) => {
        onDescriptionCard(listId, cardId, newCardDescription);
    };

    const handleDuplicateCard = (cardId: string) => {
        onDuplicateCard(listId, cardId);
    };

    return (
        <Droppable droppableId={listId} type={listType}>
            {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                <ListWrapper
                    style={style}
                    isDraggingOver={dropSnapshot.isDraggingOver}
                    isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                    {...dropProvided.droppableProps}
                >
                    <ScrollContainer>
                        <List
                            cards={cards}
                            dropProvided={dropProvided}
                            handleDeleteCard={handleDeleteCard}
                            handleRenameCard={handleRenameCard}
                            handleDescriptionCard={handleDescriptionCard}
                            handleDuplicateCard={handleDuplicateCard}
                        />
                    </ScrollContainer>
                </ListWrapper>
            )}
        </Droppable>
    );
};

export { CardsList };
