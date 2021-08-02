import React, {createContext, useState, useEffect} from 'react'

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [products, setProducts] = useState([]);
    

    useEffect(() => {
        fetch('https://shopping-cart-demo-api.herokuapp.com/products')
        .then(res => res.json())
        .then(res => {
            setProducts(res);
        })
        .catch(e => {
            console.log(e);
        })
    });
    


    const [cart, setCart] = useState([])



    const addCart = (id) =>{
        const check = cart.every(item =>{
            return item.partId != id
        })
        if(check){
            const data = products.filter(product =>{
                product.count=1
                return product.partId == id
            })
            setCart([...cart, ...data])
        }else{
            alert("The product has been added to cart.")
        }
    }

    useEffect(() =>{
       const dataCart =  JSON.parse(localStorage.getItem('dataCart'))
       if(dataCart) setCart(dataCart)
    },[])

    useEffect(() =>{
        localStorage.setItem('dataCart', JSON.stringify(cart))
    },[cart])


    const value = {
        products: [products, setProducts],
        cart: [cart, setCart],
        addCart: addCart
    }

    
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}