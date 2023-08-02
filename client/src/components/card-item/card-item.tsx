import type { DraggableProvided } from '@hello-pangea/dnd';
import React from 'react';

import type { Card } from '../../common/types';
import { CopyButton } from '../primitives/copy-button';
import { DeleteButton } from '../primitives/delete-button';
import { Splitter } from '../primitives/styled/splitter';
import { Text } from '../primitives/text';
import { Title } from '../primitives/title';
import { Container } from './styled/container';
import { Content } from './styled/content';
import { Footer } from './styled/footer';

type Props = {
    card: Card;
    isDragging: boolean;
    provided: DraggableProvided;
    onDelete: (cardId: string) => void;
    onRename: (cardId: string, newCardName: string) => void;
    onChangeDescription: (cardId: string, newCardDescription: string) => void;
    onDuplicate: (cardId: string) => void;
};

export const CardItem = ({
    card,
    isDragging,
    provided,
    onDelete,
    onRename,
    onChangeDescription,
    onDuplicate,
}: Props) => {
    return (
        <Container
            className="card-container"
            isDragging={isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-is-dragging={isDragging}
            data-testid={card.id}
            aria-label={card.name}
        >
            <Content>
                <Title
                    onChange={(newName) => onRename(card.id, newName)}
                    title={card.name}
                    fontSize="large"
                    bold={true}
                />
                <Text
                    text={card.description}
                    onChange={(newDescription) => onChangeDescription(card.id, newDescription)}
                />
                <Footer>
                    <DeleteButton
                        onClick={() => {
                            onDelete(card.id);
                        }}
                    />
                    <Splitter />
                    <CopyButton
                        onClick={() => {
                            onDuplicate(card.id);
                        }}
                    />
                </Footer>
            </Content>
        </Container>
    );
};
