import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setSortBy} from '../redux/reducers/filters-reducer';
import PropTypes from 'prop-types';

export const SortPopup = React.memo(function SortPopup({sortCategories, activeSortCategory}) {
    const sortRef = useRef();
    const dispatch = useDispatch();
    const [visiblePopup, setVisiblePopup] = useState(false);

    const activeLabel = sortCategories[activeSortCategory].name;

    const onChangeSorting = (index) => {
        dispatch(setSortBy(index));
    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);

        return () => document.body.removeEventListener('click', handleOutsideClick);
    }, []);

    const toggleVisiblePopup = () => {
        setVisiblePopup(prev => !prev);
    };
    const onSelectItem = (index) => {
        // For avoiding unnecessary re renders
        activeSortCategory !== index &&
        onChangeSorting(index);
        setVisiblePopup(false);
    };
    const handleOutsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath());
        if (!path.includes(sortRef.current)) {
            setVisiblePopup(false);
        }
    };

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={visiblePopup ? 'rotated' : ''}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sort by:</b>
                <span onClick={toggleVisiblePopup}>{activeLabel}</span>
            </div>
            {visiblePopup &&
            <div className="sort__popup">
                <ul>
                    {
                        sortCategories.map((item, index) =>
                            <li className={activeSortCategory === index ? 'active' : ''}
                                key={`${item.name}_${index}`}
                                onClick={() => onSelectItem(index)}>
                                {item.name}
                            </li>
                        )
                    }
                </ul>
            </div>
            }
        </div>
    );
});

SortPopup.propTypes = {
    sortCategories: PropTypes.arrayOf(PropTypes.object),
    activeSortCategory: PropTypes.number,
};
