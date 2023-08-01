import { DroppableProvided } from '@hello-pangea/dnd';

import { Card } from '../../../common/types';
import { DropZone } from '../styled/drop-zone';
import { Cards } from './cards';

type Props = {
    dropProvided: DroppableProvided;
    cards: Card[];
    handleDeleteCard: (cardId: string) => void;
};

const List = ({ cards, dropProvided, handleDeleteCard }: Props) => {
    return (
        <div className="list-container">
            <DropZone ref={dropProvided.innerRef}>
                <Cards cards={cards} onDeleteCard={handleDeleteCard} />
                {dropProvided.placeholder}
            </DropZone>
        </div>
    );
};

export { List };
