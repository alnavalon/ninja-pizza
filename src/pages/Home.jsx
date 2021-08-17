import {Categories} from '../components/Categories';
import {SortPopup} from '../components/SortPopup';
import {PizzaBlock} from '../components/pizzaBlock/PizzaBlock';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBlock from '../components/pizzaBlock/LoadingBlock';
import {addCartItem} from '../redux/reducers/cart-reducer';


export const Home = () => {
    const {
        items,
        isLoaded,
        sortCategories,
        activeSortCategory,
        categories,
        activeCategory
    } = useSelector(({
                         pizzaData,
                         filters
                     }) => {
        return {
            items: pizzaData.items,
            isLoaded: pizzaData.isLoaded,
            sortCategories: filters.sortCategories,
            activeSortCategory: filters.activeSortCategory,
            categories: filters.categories,
            activeCategory: filters.activeCategory
        };
    });
    const dispatch = useDispatch();

    const getSortData = () => {
        switch (activeSortCategory) {
            case 0:
                return items.sort((a, b) => b.rating - a.rating);
            case 1:
                return items.sort((a, b) => a.prices[0] - b.prices[0]);
            case 2:
                return items.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
            default:
                return items;
        }
    };

    const addPizzaToCart = (obj) => {
        dispatch(addCartItem(obj));
    };
    return (
        <div className="container">
            <div className="content__top">
                <Categories categories={categories}
                            activeCategory={activeCategory}
                />
                <SortPopup sortCategories={sortCategories}
                           activeSortCategory={activeSortCategory}
                />
            </div>
            <h2 className="content__title">All pizza</h2>
            <div className="content__items">
                {
                    isLoaded ?
                        getSortData().filter(item => activeCategory === 0 || item.category === activeCategory).map(item => (
                            <PizzaBlock onClickAddPizza={(obj)=>addPizzaToCart(obj)} key={item.id} {...item}/>
                        )) :
                        Array(8).fill(0).map((value, index) => <LoadingBlock key={index}/>)

                }
            </div>
        </div>
    );
};

