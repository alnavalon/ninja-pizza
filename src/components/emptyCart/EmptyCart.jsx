import emptyCartImg from '../../assets/img/empty-cart.png';
import Button from '../Button/Button';
import {Link} from 'react-router-dom';

export function EmptyCart() {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Cart is empty 😕</h2>
                    <p>
                        Probably you have not chosen any pizza yet.<br/>
                        For ordering pizza get back to the main page.
                    </p>
                    <img src={emptyCartImg} alt="Empty cart"/>
                    <Link to="/">
                        <Button className="button--black">
                            <span>Return</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}