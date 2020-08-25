import React from 'react';
import 'material-icons/iconfont/material-icons.css';
import './scss/NavBar.scss';

import githubIcon from '../assets/github-icon.svg';
import rickIcon from '../assets/rick-icon.svg';

const NavBar: React.FC = () => {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <a
                        href="#!"
                        data-target="slide-out"
                        className="sidenav-trigger"
                    >
                        <i className="material-icons">menu</i>
                    </a>
                    <a href="#!" className="brand-logo center">
                        <img
                            src={rickIcon}
                            alt="Rick Icon"
                            height="50"
                            width="50"
                        />
                        <span>Rick and Morty</span>
                    </a>
                    <ul id="nav-mobile" className="right">
                        <li>
                            <a
                                href="https://github.com/Felichz/RickAndMorty"
                                target="blank"
                            >
                                <img
                                    src={githubIcon}
                                    alt="GitHub Icon"
                                    height="26"
                                    width="26"
                                />
                                <span>Source Code</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
