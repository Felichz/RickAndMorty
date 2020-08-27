import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../layout/Layout';
import ItemList from '../components/ItemList/ItemList';

import './App.scss';

const App: React.FC = () => (
    <BrowserRouter basename="/rickandmorty">
        <Layout>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/characters" />
                </Route>

                <Route path="/characters">
                    <ItemList entity="CHARACTERS" key="1" />
                </Route>

                <Route path="/locations">
                    <ItemList entity="LOCATIONS" key="2" />
                </Route>

                <Route path="/episodes">
                    <ItemList entity="EPISODES" key="3" />
                </Route>
            </Switch>

            {/* <ModalWithData /> */}
        </Layout>
    </BrowserRouter>
);

export default App;
