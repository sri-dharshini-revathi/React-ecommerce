import React,{useContext, useState, useEffect} from 'react'
import {DataContext} from '../components/DataProvider'
import {Link} from 'react-router-dom'
import Header from '../components/Header';

export default function Cart() {
    const value = useContext(DataContext)
    const [cart, setCart] = value.cart;
    const [total, setTotal] = useState(0);
    

    useEffect(() =>{
        const getTotal = () => {
            
            const res = cart.reduce((prev, item) => {
                let price = item.priceValue.replace(/,/g, '');
                return prev + (price * item.count)
            },0)
            setTotal(res)
        }
        getTotal()
    },[cart])

    const reduction = id => {
        cart.forEach(item =>{
            if(item.partId == id){
                item.count == 1 ? removeProduct(item.partId) : item.count -= 1;
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

    const removeProduct = id => {
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item.partId == id){
                    cart.splice(index, 1)
                    item.count = 0;
                }
            })
            setCart([...cart])
        }
    }
    

    if(cart.length === 0)
        
        return( 
        <div>
        <Header/>
        <h2 style={{textAlign: "center", fontSize: "30px"}}>Cart Empty</h2>
        </div>)

    return (
        <div>
        <div>
            <Header />
        </div>
        
        
           {
            
               cart.map(product =>(
                <div>
                   <div className="details cart" key={product.partId}>
                       <div className="img-container" 
                       style={{backgroundImage: `url(${product.image1})`}} >
                       </div>

                       <div className="box-details">
                           <h2 title={product.title}>{product.title}</h2>
                           </div>
                           <div className="box-details">
                           <h3>Rs.{product.priceValue}</h3>
                           </div>
                           
                           <div className="amount">
                               <button className="count" onClick={() => reduction(product.partId)}> - </button>
                               <span>{product.count}</span>
                               <button className="count" onClick={() => increase(product.partId)}> + </button>
                           </div>

                           <div className="delete" onClick={() => removeProduct(product.partId)}>X</div>
                       

                   </div>
                   </div>
               ))
           }

           <div className="total">
               <Link to="/payment">Payment</Link>
               <h3>Total: Rs. {total}</h3>
           </div>
           </div>
        
    )
}