import React from 'react';
import ReactDOM from 'react-dom';

import App from './routes/App';

import { ApolloClient, ApolloProvider } from '@apollo/client';
import cache from './Apollo/cache';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
