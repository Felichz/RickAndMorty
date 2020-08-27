import React, { useState } from 'react';
import './scss/ItemList.scss';

import Search from '../Search';
import Card from '../Card';
import ItemListData from './ItemListData';
import Paginator from '../Paginator';
import useItemModal from './useItemModal';
import Modal from '../Modal';

export type EntityTypes = 'CHARACTERS' | 'LOCATIONS' | 'EPISODES';

export type Variables = {
    page: number;
    name: string;
    type: string;
};

interface ItemListProps {
    entity: EntityTypes;
}

const ItemList: React.FC<ItemListProps> = ({ entity }) => {
    const [queryVariables, setQueryVariables] = useState<Variables>({
        name: '',
        type: '',
        page: 1,
    });

    const { showModal, modalProps } = useItemModal();

    const onSearch = (filterName: string, value: string) => {
        setQueryVariables({
            ...queryVariables,
            [filterName]: value,
            page: 1,
        });
    };

    const onPageChange = (page: number) => {
        setQueryVariables({ ...queryVariables, page });
    };

    return (
        <div>
            <Search filterName="name" onSearch={onSearch} />
            {entity !== 'EPISODES' && (
                <Search filterName="type" onSearch={onSearch} />
            )}

            <ItemListData entity={entity} variables={queryVariables}>
                {(data) => {
                    const { pages, prev } = data.info;
                    const items = data.results;

                    return (
                        <>
                            <div id="item-list">
                                {items.map((item) => (
                                    <div key={item.id}>
                                        <Card
                                            {...item}
                                            onClick={() =>
                                                showModal(entity, item.id)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            <Paginator
                                pages={pages}
                                active={prev + 1}
                                onPageChange={onPageChange}
                            />
                        </>
                    );
                }}
            </ItemListData>
            <Modal {...modalProps} />
        </div>
    );
};

export default ItemList;
