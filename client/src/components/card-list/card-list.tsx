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
};

const CardsList = ({ listId, listType, style, cards, onDeleteCard, onRenameCard }: Props) => {
    const handleDeleteCard = (cardId: string) => {
        onDeleteCard(listId, cardId);
    };

    const handleRenameCard = (cardId: string, newCardName: string) => {
        onRenameCard(listId, cardId, newCardName);
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
                        />
                    </ScrollContainer>
                </ListWrapper>
            )}
        </Droppable>
    );
};

export { CardsList };
