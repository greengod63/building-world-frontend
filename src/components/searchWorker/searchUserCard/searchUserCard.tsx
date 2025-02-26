import './searchUserCard.scss';
import { FC } from 'react';
import { searchUserCardProps } from '../../../types/searchWorker/searchWorkerTypes';

const SearchUserCard = ({position, url, name}: searchUserCardProps) => {
    return (
        <div className='search-user-card'>
            <div className="search-user-card-wrapper">
                <div className="search-user-card-img-conatiner">
                    <img src={url} alt="" />
                </div>

                <div className="search-user-card-text-container">
                    <div className="search-user-card-text">{name}</div>
                    <div className="search-user-card-text">{position}</div>
                </div>
            </div>
        </div>
    );
};

export default SearchUserCard;