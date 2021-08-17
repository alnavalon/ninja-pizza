const SET_SORT_BY = 'SET_SORT_BY';
const SET_CATEGORY = 'SET_CATEGORY';

const initialState = {
    categories: ['All', 'Meat', 'Vegetarian', 'Grill', 'Сheesy', 'Pies'],
    activeCategory: 0,
    sortCategories: [
        {name: 'Popularity', type: 'popularity'},
        {name: 'Price: Low-High', type: 'price'},
        {name: 'Product name: A to Z', type: 'name'}
    ],
    activeSortCategory: 0
};

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SORT_BY:
            return {
                ...state,
                activeSortCategory: action.payload
            };
        case SET_CATEGORY:
            return {
                ...state,
                activeCategory: action.payload
            };
        default:
            return state;
    }
};

export const setSortBy = (sortIndex) => ({
    type: SET_SORT_BY,
    payload: sortIndex
});

export const setCategory = (catIndex) => ({
    type: SET_CATEGORY,
    payload: catIndex
});

export default filtersReducer;