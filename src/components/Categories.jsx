import React from 'react';
import {useDispatch} from 'react-redux';
import {setCategory} from '../redux/reducers/filters-reducer';
import PropTypes from 'prop-types';


export const Categories = React.memo(function Categories({categories, activeCategory}) {
    const dispatch = useDispatch();

    const onChangeCategory = (index) => {
        dispatch(setCategory(index));
    };

    return (
        <div className="categories">
            <ul>
                {
                    categories?.map((item, index) =>
                        <li key={`${item}_${index}`}
                            className={activeCategory === index ? 'active' : ''}
                            onClick={() => onChangeCategory(index)}>{item}
                        </li>
                    )
                }
            </ul>
        </div>);
});

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    activeCategory: PropTypes.number,
};
