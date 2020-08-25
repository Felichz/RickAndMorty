import React, { useEffect } from 'react';
import M from 'materialize-css';

import './scss/SideNav.scss';
import NavBar from './NavBar';
import { withRouter, RouteComponentProps, useLocation } from 'react-router-dom';

const SideNav: React.FC<RouteComponentProps> = ({ history }) => {
    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    }, []);

    function navigate(path: string) {
        history.push(path);
    }

    const path = useLocation().pathname;

    return (
        <>
            <NavBar />

            <ul id="slide-out" className="sidenav sidenav-fixed">
                <span style={{ fontSize: 'large' }}>Search for:</span>
                <li>
                    <label htmlFor="chars-filter">
                        <input
                            name="filters"
                            id="chars-filter"
                            type="radio"
                            onChange={() => navigate('/characters')}
                            defaultChecked={path === '/characters'}
                        />
                        <span>Characters</span>
                    </label>
                </li>
                <li>
                    <label htmlFor="locations-filter">
                        <input
                            name="filters"
                            id="locations-filter"
                            type="radio"
                            onChange={() => navigate('/locations')}
                            defaultChecked={path === '/locations'}
                        />
                        <span>Locations</span>
                    </label>
                </li>
                <li>
                    <label htmlFor="episodes-filter">
                        <input
                            name="filters"
                            id="episodes-filter"
                            type="radio"
                            onChange={() => navigate('/episodes')}
                            defaultChecked={path === '/episodes'}
                        />
                        <span>Episodes</span>
                    </label>
                </li>
            </ul>
        </>
    );
};

export default withRouter(SideNav);
