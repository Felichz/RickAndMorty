import React, { useCallback } from 'react';
import { EntityTypes } from './ItemList';

import {
    GET_CHAR,
    GET_LOCATION,
    GET_EPISODE,
    GetSingleItemResponse,
} from '../../Apollo/queries';

import { DocumentNode, useLazyQuery } from '@apollo/client';

import { ModalProps } from '../Modal';
import { useEffect, useState } from 'react';

interface Variables {
    id: number;
}

type Response = GetSingleItemResponse;

function useItemModal() {
    const [entity, setEntity] = useState<EntityTypes | undefined>();

    let query: DocumentNode;
    switch (entity) {
        case 'EPISODES':
            query = GET_EPISODE;
            break;
        case 'LOCATIONS':
            query = GET_LOCATION;
            break;
        default:
            query = GET_CHAR;
    }

    const [execQuery, response] = useLazyQuery<Response, Variables>(query);
    const [modalProps, setModalProps] = useState<ModalProps | undefined>();

    const { data, loading } = response;

    const showModal = useCallback(
        (entity: EntityTypes, id: number) => {
            setEntity(entity);
            execQuery({
                variables: { id },
            });
        },
        [execQuery]
    );

    useEffect(() => {
        if (loading || data) {
            console.log('       Set loading true');
            setModalProps({ loading: true });
        }
        if (data && data.data) {
            console.log('       Set loading false in 250ms');
            let { data: itemInfo } = data;
            let tableData;
            let collectionItems;

            const modalCollection = (items: { id: number; name: string }[]) =>
                items.slice(0, 5).map(({ id, name }) => (
                    <a
                        href="#!"
                        className="collection-item"
                        onClick={() => {
                            showModal('CHARACTERS', id);
                        }}
                        key={id}
                    >
                        {name}
                    </a>
                ));

            switch (entity) {
                case 'EPISODES':
                    tableData = {
                        'Release date': itemInfo.air_date,
                        Episode: itemInfo.episode,
                    };

                    if (itemInfo.characters[0].name) {
                        collectionItems = {
                            title: 'Some episode characters',
                            items: modalCollection(itemInfo.characters),
                        };
                    }
                    break;
                case 'LOCATIONS':
                    tableData = {
                        Type: itemInfo.type,
                        Dimension: itemInfo.dimension,
                    };

                    if (itemInfo.residents[0].name) {
                        collectionItems = {
                            title: 'Some residents',
                            items: modalCollection(itemInfo.residents),
                        };
                    }
                    break;
                default:
                    tableData = {
                        Type: itemInfo.type,
                        Genre: itemInfo.gender,
                        Species: itemInfo.species,
                    };
            }

            const modalData: ModalProps = {
                title: itemInfo.name,
                image: itemInfo.image,
                tableData,
                collectionItems,
            };

            setTimeout(() => {
                console.log('       Loading false');
                setModalProps({ ...modalData, loading: false });
            }, 250);
        }
    }, [response, data, loading, entity, showModal]);

    return { showModal, modalProps };
}

export default useItemModal;
