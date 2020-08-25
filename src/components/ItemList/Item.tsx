import React, { useState } from 'react';
import Card from '../Card';
import ModalData from './ModalData';
import Modal from '../Modal';
import { EntityTypes } from './ItemList';
import { SearchItemResult } from '../../Apollo/queries';

export interface ItemProps {
    id: number;
    entity: EntityTypes;
    itemData: SearchItemResult;
}

const Item: React.FC<ItemProps> = ({ id, entity, itemData }) => {
    const [showModal, setShowModal] = useState(false);

    function cardClick() {
        setShowModal(true);
    }

    function modalClosed() {
        setShowModal(false);
    }

    return (
        <div>
            <Card {...itemData} onClick={cardClick} />
            {showModal && (
                <ModalData id={id} entity={entity}>
                    {(modalData) => (
                        <Modal
                            title={itemData.title}
                            image={itemData.image}
                            data={modalData}
                            onClose={modalClosed}
                        />
                    )}
                </ModalData>
            )}
        </div>
    );
};

export default Item;
