import React from 'react';

import Loader from '../Loader';
import { EntityTypes, Variables } from './ItemList';

import { useQuery } from 'react-apollo';
import { DocumentNode } from '@apollo/client';
import {
    SEARCH_CHARS_QUERY,
    SEARCH_EPISODES_QUERY,
    SEARCH_LOCATIONS_QUERY,
    SearchResponse,
} from '../../Apollo/queries';

type Response = SearchResponse;

interface ItemListDataProps {
    entity: EntityTypes;
    variables: Variables;
    children: (data: Response['data']) => React.ReactNode;
}

const ItemListData: React.FC<ItemListDataProps> = ({
    entity,
    variables,
    children,
}) => {
    let query: DocumentNode;
    switch (entity) {
        case 'EPISODES':
            query = SEARCH_EPISODES_QUERY;
            break;
        case 'LOCATIONS':
            query = SEARCH_LOCATIONS_QUERY;
            break;
        default:
            query = SEARCH_CHARS_QUERY;
    }

    const { data, loading, error } = useQuery<Response, Variables>(query, {
        variables,
    });

    if (loading) return <Loader />;

    if (error || !data) return <h4>No items found</h4>;

    return <>{children(data.data)}</>;
};

export default ItemListData;
