import React, { useCallback, useRef } from 'react';
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
    const [prevEntity, setPrevEntity] = useState<EntityTypes | undefined>();

    const [currentId, setCurrentId] = useState<number | undefined>();
    const [prevId, setPrevId] = useState<number | undefined>();

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

    const [execQuery, response] = useLazyQuery<Response, Variables>(query, {
        onCompleted(data) {},
    });
    const [modalProps, setModalProps] = useState<ModalProps | undefined>();

    const sendModal = useRef(false);

    let { data, loading } = response;

    const showModal = useCallback(
        (
            entity: EntityTypes,
            id: number,
            prevEntity?: EntityTypes,
            prevId?: number
        ) => {
            setCurrentId(id);
            setEntity(entity);
            prevEntity && setPrevEntity(prevEntity);
            prevId && setPrevId(prevId);

            execQuery({
                variables: { id },
            });
            sendModal.current = true;
        },
        [execQuery]
    );

    const sendLoadingModal = useCallback(() => {
        setModalProps({ loading: true });
    }, []);

    const sendDataModal = useCallback(
        (data: Response) => {
            let { data: itemInfo } = data;

            let tableData;
            let collectionItems;
            let closeButton;

            const modalCollection = (items: { id: number; name: string }[]) =>
                items.slice(0, 5).map(({ id, name }) => (
                    <a
                        href="#!"
                        className="collection-item"
                        onClick={() => {
                            showModal('CHARACTERS', id, entity, currentId);
                        }}
                        key={id}
                    >
                        {name}
                    </a>
                ));

            const goBackButton = () => {
                if (prevEntity && prevId) {
                    return (
                        <button
                            className="modal-close waves-effect waves-green btn-flat"
                            onClick={() => {
                                showModal(prevEntity, prevId);
                            }}
                        >
                            Go Back
                        </button>
                    );
                }
            };

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
                    closeButton = goBackButton();
            }

            const modalData: ModalProps = {
                title: itemInfo.name,
                image: itemInfo.image,
                tableData,
                collectionItems,
                closeButton,
            };

            setTimeout(() => {
                setModalProps({ ...modalData, loading: false });
            }, 250);
        },
        [entity, prevEntity, currentId, prevId, showModal]
    );

    useEffect(() => {
        if (sendModal.current) {
            if (loading || data) {
                sendLoadingModal();
            }
            if (!loading && data && data.data) {
                sendModal.current = false;
                sendDataModal(data);
            }
        }
    }, [modalProps, data, loading, response, sendLoadingModal, sendDataModal]);

    return { showModal, modalProps };
}

export default useItemModal;
