import {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Button from '../Button/Button';

export function PizzaBlock({id, imageUrl, name, types, sizes, prices, onClickAddPizza}) {
    const {availablePizzaTypes, availablePizzaSizes, pizzaAmountInCart} = useSelector(({pizzaData, cart}) => ({
        availablePizzaTypes: pizzaData.availablePizzaTypes,
        availablePizzaSizes: pizzaData.availablePizzaSizes,
        pizzaAmountInCart: cart.items[id] === undefined ? 0 : cart.items[id].reduce((a, b) => a + b.amount, 0)
    }));
    const [activeSize, setActiveSize] = useState(sizes[0]);
    const [activeDoughType, setActiveDoughType] = useState(types[0]);

    const onSelectSize = (index) => {
        setActiveSize(index);
    };
    const onSelectType = (index) => {
        setActiveDoughType(index);
    };

    const currentPrice = prices[sizes.indexOf(activeSize)];

    const onAddPizza = () => {
        onClickAddPizza({
            id,
            name,
            imageUrl,
            size: activeSize,
            type: availablePizzaTypes[activeDoughType],
            price: currentPrice
        });
    };

    return (
        <div className="pizza-block">
            <div className="img-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt={name}
                />
            </div>

            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        availablePizzaTypes.map((type, index) =>
                            <li key={type}
                                className={classNames({
                                    active: activeDoughType === index,
                                    disabled: !types.includes(index)
                                })}
                                onClick={() => onSelectType(index)}
                            >
                                {type}
                            </li>)
                    }
                </ul>
                <ul>
                    {
                        availablePizzaSizes.map((size) => (
                                <li key={size}
                                    className={classNames({
                                        active: activeSize === size,
                                        disabled: !sizes.includes(size)
                                    })}
                                    onClick={() => onSelectSize(size)}>
                                    {size} cm
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{currentPrice.toFixed(2)} z??</div>
                <Button onClick={onAddPizza} outline add>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Add</span>
                    {
                        pizzaAmountInCart > 0 && <i>{pizzaAmountInCart}</i>
                    }
                </Button>
            </div>
        </div>
    );
}

PizzaBlock.propTypes = {
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.number).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    prices: PropTypes.arrayOf(PropTypes.number).isRequired,
    category: PropTypes.number,
    rating: PropTypes.number,
    onClickAddPizza: PropTypes.func
};

PizzaBlock.defaultProps = {
    types: []
};