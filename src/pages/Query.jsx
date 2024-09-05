import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// import React from 'react'
// import Query from './Query';

const Query = () => {
    function getData(){
        axios.get("https://fakestoreapi/products").then((res) => {
            return res.data;
        });
    }
    const x = useQuery('products', getData)
    console.log(x);
    
    return (
        <div>
            React
        </div>
    )
}

export default Query
