import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../layout/Layout';
import ItemList from '../components/ItemList/ItemList';

const App: React.FC = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/characters" />
                </Route>
                <Route exact path="/characters">
                    <ItemList entity="CHARACTERS" key="1" />
                </Route>
                <Route exact path="/locations">
                    <ItemList entity="LOCATIONS" key="2" />
                </Route>
                <Route exact path="/episodes">
                    <ItemList entity="EPISODES" key="3" />
                </Route>
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default App;
