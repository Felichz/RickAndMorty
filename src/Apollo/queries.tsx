import { gql } from '@apollo/client';

// Search items
export const SEARCH_CHARS_QUERY = gql`
    query SearchChars($page: Int, $name: String, $type: String) {
        data: characters(page: $page, filter: { name: $name, type: $type }) {
            info {
                pages
                prev
            }
            results {
                id
                title: name
                image
            }
        }
    }
`;

export const SEARCH_LOCATIONS_QUERY = gql`
    query SearchLocations($page: Int, $name: String, $type: String) {
        data: locations(page: $page, filter: { name: $name, type: $type }) {
            info {
                pages
                prev
            }
            results {
                id
                title: name
                description: dimension
            }
        }
    }
`;

export const SEARCH_EPISODES_QUERY = gql`
    query SearchEpisodes($page: Int, $name: String, $episode: String) {
        data: episodes(
            page: $page
            filter: { name: $name, episode: $episode }
        ) {
            info {
                pages
                prev
            }
            results {
                id
                title: name
                description: episode
            }
        }
    }
`;

// Get single item

export const GET_CHAR = gql`
    query getChar($id: ID!) {
        data: character(id: $id) {
            type
            gender
            species
        }
    }
`;

export const GET_LOCATION = gql`
    query getLocation($id: ID!) {
        data: location(id: $id) {
            type
            dimension
            residents {
                name
            }
        }
    }
`;

export const GET_EPISODE = gql`
    query getEpisode($id: ID!) {
        data: episode(id: $id) {
            air_date
            episode
            characters {
                name
            }
        }
    }
`;

export interface SearchItemResult {
    id: number;
    image?: string;
    title: string;
    description: string;
}

export interface SearchResponse {
    data: {
        info: {
            pages: number;
            prev: number;
        };
        results: SearchItemResult[];
    };
}

interface GetCharResponse {
    data: {
        type: string;
        gender: string;
        species: string;
    };
}

interface GetLocationResponse {
    data: {
        type: string;
        dimension: string;
        residents: { name: string }[];
    };
}

interface GetEpisodeResponse {
    data: {
        air_date: string;
        episode: string;
        characters: { name: string }[];
    };
}

export type GetSingleItemResponse = GetCharResponse &
    GetLocationResponse &
    GetEpisodeResponse;
