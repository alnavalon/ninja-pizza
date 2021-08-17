import './App.css';
import {Header} from './components/Header/Header';
import {Home} from './pages/Home';
import {Route, Switch} from 'react-router-dom';
import Cart from './pages/Cart';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchPizzaData} from './redux/reducers/pizza-reducer';


function App() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPizzaData());
    }, []);

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                {/* {
                    isLoaded &&*/}
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/cart" exact>
                        <Cart/>
                    </Route>
                </Switch>

            </div>
        </div>
    );
}

export default App;
