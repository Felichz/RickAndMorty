import React, { useRef, useEffect } from 'react';

import './scss/Card.scss';
export interface CardProps {
    image?: string;
    title: string;
    description?: string;
    onClick?: () => any;
}

const Card: React.FC<CardProps> = ({ image, title, description, onClick }) => {
    const div = document.createElement('div');
    const cardRef = useRef<HTMLDivElement>(div);

    useEffect(() => {
        if (onClick) {
            cardRef.current.addEventListener('click', () => onClick());
        }
    }, [onClick]);

    return (
        <div className="card" ref={cardRef}>
            <div className="card-image">
                {image && <img src={image} alt="Card" />}
                <div className="zoom-button">
                    <i className="material-icons">zoom_in</i>
                </div>
            </div>
            <div className="card-content">
                <span className="card-title">{title}</span>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
};

export default Card;