import React,{useContext, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {DataContext} from '../components/DataProvider'
import Header from '../components/Header';


export default function Details() {
    const {id} = useParams();
    const value = useContext(DataContext)
    const [products] = value.products
    const addCart = value.addCart

    const [cart, setCart] = value.cart;
    
    const imgDiv = useRef();


    const details = products.filter((product) =>{
        return product.partId == id
    })
    
    const reduction = id => {
        cart.forEach(item =>{
            if(item.partId == id){
                item.count -= 1 ;
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
        <>
           {
               details.map(product =>(
                   <div>
                   <Header/>
                   <div className="details" key={product.partId}>
                       <div className="img-container" 
                       style={{backgroundImage: `url(${product.image1})`}} ref={imgDiv} />

                       <div className="box-details">
                           <h2 title={product.title}>{product.title}</h2>
                           <h3>Rs.{product.priceValue}</h3>
                           <p>{product.description}</p>
                           <p>{product.partType}</p>
                           {/* {value.find(((item) => item.partId == product.partId)
                                .count
                                ) == 0 ? ( */}
                                    <button className="cart" onClick={() => addCart(product.partId)}>
                                        Add to cart
                                    </button>
                                {/* ):(
                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(product.partId)}> - </button>
                                        <span>{product.count}</span>
                                        <button className="count" onClick={() => increase(product.partId)}> + </button>
                                    </div>
                                )
                                
                           } */}
                       </div>

                   </div>
                   </div>
               ))
           }
        </>
    )
}