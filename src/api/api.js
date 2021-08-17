import axios from 'axios';

export const pizzaDataAPI = {
    fetchData() {
        return axios.get('/pizzas?_sort=rating&_order=desc');
    }
}