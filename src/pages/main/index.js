import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products/?page=${page}`);

        const { results, ...productInfo } = response.data;

        this.setState({ products: results, productInfo, page });
    };

    prevPage = () => {

        const { page, productInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {

        const { page, productInfo } = this.state;

        if (productInfo.next === false) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {

        const { products, productInfo } = this.state;
        return (
            <div className='product-list'>
                {products.map(product => (
                    <article key={product.id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product.id}`}>Acessar</Link>
                    </article>
                ))}
                <div className='actions'>
                    <button disabled={productInfo.previous === null} onClick={this.prevPage}>Anterior</button>
                    <button disabled={productInfo.next === null} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}