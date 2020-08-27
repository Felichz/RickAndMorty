import React from 'react';

import './scss/Paginator.scss';

export interface PaginatorProps {
    pages: number;
    active: number;
    onPageChange?: (page: number) => any;
}

const Paginator: React.FC<PaginatorProps> = ({
    pages,
    active,
    onPageChange,
}) => {
    function pageChange(page: number) {
        if (onPageChange) onPageChange(page);
    }

    const pageButtons = () => {
        let buttons = [];

        // Always showing 7 pages max
        let start = Math.max(active - 3, 1);
        let end = Math.min(start + 6, pages);
        if (start === 1) {
            end = Math.min(start + 6, pages);
        } else if (end === pages) {
            start = Math.max(active - 6, 1);
        }

        if (start > 1) {
            buttons.push(
                <li key={'startDots'}>
                    <a onClick={() => pageChange(1)}>1</a>
                </li>
            );
        }

        if (start > 2) {
            buttons.push(
                <li key={0}>
                    <i className="material-icons dots">more_horiz</i>
                </li>
            );
        }

        for (let i = start; i <= end; i++) {
            buttons.push(
                <li className={`${active === i && 'active'}`} key={i}>
                    <a onClick={() => pageChange(i)}>{i}</a>
                </li>
            );
        }

        if (end < pages - 1) {
            buttons.push(
                <li key={'finalDots'}>
                    <i className="material-icons dots">more_horiz</i>
                </li>
            );
        }

        if (end < pages) {
            buttons.push(
                <li key={pages}>
                    <a onClick={() => pageChange(pages)}>{pages}</a>
                </li>
            );
        }

        return buttons;
    };

    const prevPageDisabled = active === 1;
    const nextPageDisabled = active === pages;

    const prevPage = () => {
        if (!prevPageDisabled) {
            pageChange(active - 1);
        }
    };

    const nextPage = () => {
        if (!nextPageDisabled) {
            pageChange(active + 1);
        }
    };

    return (
        <ul className="pagination center" id="paginator">
            <li className={prevPageDisabled ? 'disabled' : 'waves-effect'}>
                <a onClick={prevPage}>
                    <i className="material-icons">chevron_left</i>
                </a>
            </li>
            {pageButtons()}
            <li className={nextPageDisabled ? 'disabled' : 'waves-effect'}>
                <a onClick={nextPage}>
                    <i className="material-icons">chevron_right</i>
                </a>
            </li>
        </ul>
    );
};

export default Paginator;
