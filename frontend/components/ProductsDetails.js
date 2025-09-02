import React,{useState,useEffect} from "react";
import Link from "next/link";


function ProductsDetails(){
    
    const products = [
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        },
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        },
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        },
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        }
    ]        
    

    return(
        <div className="product-grid">

                {
                    products.map((obj) => (
                        <div className="product" key={obj.id}>

                            <img src={obj.image} alt="alternative"></img>
                            <h2>{obj.title}</h2>
                            <p>
                                <span>{obj.price}</span>
                            </p>
                            <Link href={`/product/${obj.id}`}>
                            <button>product details</button>
                            </Link>

                        </div>
                    ))
                }

        </div>
    )

}

export default ProductsDetails;