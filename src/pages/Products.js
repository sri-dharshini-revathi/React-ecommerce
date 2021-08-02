import React, {useContext} from 'react'
import {DataContext} from '../components/DataProvider'
import {Link} from 'react-router-dom'
import Header from '../components/Header';

export default function Products() {
    const value = useContext(DataContext)
    const [products] = value.products
    const addCart = value.addCart
    const [cart, setCart] = value.cart;

    const reduction = id => {
        cart.forEach(item =>{
            if(item.partId == id){
                item.count == 1 ? addCart(item.partId) : item.count -= 1;
            }
        })
        setCart([...cart])
    }
    const increase = id => {
        cart.forEach(item =>{
            if(item.partId == id){
                item.count += 1 ;
            }
        })
        setCart([...cart])
    }

    return (
        <div>
        <Header />
        <div className="products">
            {
                products.map(product =>(
                    <div className="card" key={product.partId}>
                        <Link to={`/products/${product.partId}`}>
                            <img src={product.image1} alt="" width="9/12"/>
                        </Link>
                        <div className="box">
                        <h3 title={product.title}>
                            <Link to={`/products/${product.partId}`}>{product.title}</Link>
                        </h3>
                        <p>{product.partType}</p>
                        <h4>{product.priceValue}</h4>
                        {product.count == 0 ?
                        (<button onClick={() => addCart(product.partId)}>
                            Add to cart 
                        </button>) : (
                            <div className="amount">
                                        <button className="count" onClick={() => reduction(product.partId)}> - </button>
                                        <span>{product.count}</span>
                                        <button className="count" onClick={() => increase(product.partId)}> + </button>
                                    </div>
                        )
                        
                        }
                        </div>
                    </div>
                ))
            }
          
            </div>
        </div>
    )
}