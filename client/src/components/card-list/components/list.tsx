import { DroppableProvided } from '@hello-pangea/dnd';

import { Card } from '../../../common/types';
import { DropZone } from '../styled/drop-zone';
import { Cards } from './cards';

type Props = {
    dropProvided: DroppableProvided;
    cards: Card[];
    handleDeleteCard: (cardId: string) => void;
    handleRenameCard: (cardId: string, newCardName: string) => void;
};

const List = ({ cards, dropProvided, handleDeleteCard, handleRenameCard }: Props) => {
    return (
        <div className="list-container">
            <DropZone ref={dropProvided.innerRef}>
                <Cards cards={cards} onDeleteCard={handleDeleteCard} onRenameCard={handleRenameCard} />
                {dropProvided.placeholder}
            </DropZone>
        </div>
    );
};

export { List };
