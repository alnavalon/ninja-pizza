const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const REMOVE_ONE_POSITION = 'REMOVE_ONE_POSITION';
const REMOVE_ALL_CART = 'REMOVE_ALL_CART';


const initialState = {
    items: {},
    totalPrice: 0,
    itemsCount: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            let index = state.items[action.payload.id]?.findIndex(item => item.size === action.payload.size) === undefined
                ? -1
                : state.items[action.payload.id]?.findIndex(item => item.size === action.payload.size && item.type === action.payload.type);
            let changedItem;
            if (index !== -1) {
                changedItem = [...state.items[action.payload.id]];
                ++changedItem[index].amount;
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: state.items[action.payload.id] ?
                        (index === -1 ? [...state.items[action.payload.id], action.payload] : changedItem) :
                        [action.payload]
                },
                totalPrice: state.totalPrice + action.payload.price,
                itemsCount: state.itemsCount + 1
            };
        }

        case REMOVE_ITEM: {
            let itemIndex = state.items[action.payload.id].findIndex(item => item.size === action.payload.size && item.type === action.payload.type);
            let result = [...state.items[action.payload.id]];
            result[itemIndex].amount > 1
                ? --result[itemIndex].amount
                : result.splice(itemIndex, 1);
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: result
                },
                totalPrice: state.totalPrice - action.payload.price,
                itemsCount: state.itemsCount - 1

            };
        }

        case REMOVE_ALL_CART: {
            return initialState;
        }

        case REMOVE_ONE_POSITION: {
            let itemIndex = state.items[action.payload.id].findIndex(item => item.size === action.payload.size && item.type === action.payload.type);
            let moneyDifference = action.payload.price * state.items[action.payload.id][itemIndex].amount;
            let amountDifference = state.items[action.payload.id][itemIndex].amount;
            let result = [...state.items[action.payload.id]];
            result.splice(itemIndex, 1);

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: result
                },
                totalPrice: state.totalPrice - moneyDifference,
                itemsCount: state.itemsCount - amountDifference
            };
        }

        default:
            return state;
    }
};

export const addCartItem = (item) => {
    item.amount = 1;
    return {
        type: ADD_ITEM,
        payload: item
    };
};

export const removeCartItem = (item) => ({
    type: REMOVE_ITEM,
    payload: item
});

export const removeAllCart = () => ({
    type: REMOVE_ALL_CART,
});

export const removeOnePosition = (item) => ({
    type: REMOVE_ONE_POSITION,
    payload: item
});

export default cartReducer;