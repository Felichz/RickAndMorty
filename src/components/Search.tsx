import React, { FormEvent, useState } from 'react';

import './scss/Search.scss';

interface SearchProps {
    filterName: string;
    onSearch(filterName: string, value: string): any;
}

const Search: React.FC<SearchProps> = ({ filterName, onSearch }) => {
    const elementId = filterName + '-search';

    const TYPE_TIMEOUT = 300;
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

    function onInput(e: FormEvent) {
        const target = e.target as HTMLInputElement;

        if (target.value.length >= 3 || !target.value.length) {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }

            setTypingTimeout(
                setTimeout(() => {
                    onSearch(filterName, target.value);
                }, TYPE_TIMEOUT)
            );
        }
    }

    function onClean() {
        const element = document.getElementById(elementId) as HTMLInputElement;

        if (element) {
            element.value = '';
            onSearch(filterName, '');
        }
    }

    return (
        <div className="row valign-wrapper search">
            <div className="col s12">
                <div className="input-field">
                    <i className="material-icons prefix">search</i>
                    <input
                        type="text"
                        className="autocomplete disabled"
                        id={elementId}
                        onInput={onInput}
                    />
                    <label htmlFor={elementId}>
                        <span>Search by {filterName}</span>
                    </label>
                </div>
            </div>
            <div className="col">
                <a
                    href="#!"
                    className="waves-effect waves-light btn"
                    onClick={onClean}
                >
                    Clean
                </a>
            </div>
        </div>
    );
};

export default Search;
