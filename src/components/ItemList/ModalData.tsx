import React from 'react';
import { EntityTypes } from './ItemList';

import {
    GET_CHAR,
    GET_LOCATION,
    GET_EPISODE,
    GetSingleItemResponse,
} from '../../Apollo/queries';

import { DocumentNode } from '@apollo/client';
import { useQuery } from 'react-apollo';

interface Variables {
    id: number;
}

type Response = GetSingleItemResponse;

export interface ModalDataProps {
    id: number;
    entity: EntityTypes;
    children: (modalData?: {}) => React.ReactNode;
}

const ModalData: React.FC<ModalDataProps> = ({ id, entity, children }) => {
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

    const { data, loading } = useQuery<Response, Variables>(query, {
        variables: {
            id,
        },
    });

    let modalData = null;
    if (data && !loading) {
        let { data: itemInfo } = data;
        let mappedData;

        const firstNamesToString = (array: { name: string }[]) =>
            array
                .slice(0, 5)
                .map((item) => item.name)
                .reduce((name, accum) => (accum += `, ${name}`)) + ', etc...';

        switch (entity) {
            case 'EPISODES':
                mappedData = {
                    'Release date': itemInfo.air_date,
                    Episode: itemInfo.episode,
                    Characters: firstNamesToString(itemInfo.characters),
                };
                break;
            case 'LOCATIONS':
                mappedData = {
                    Type: itemInfo.type,
                    Dimension: itemInfo.dimension,
                    Residents: firstNamesToString(itemInfo.residents),
                };
                break;
            default:
                mappedData = {
                    Type: itemInfo.type,
                    Genre: itemInfo.gender,
                    Species: itemInfo.species,
                };
        }

        modalData = mappedData;
    }

    return <>{children(modalData || undefined)}</>;
};

export default ModalData;
