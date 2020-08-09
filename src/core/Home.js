import React,{useState,useEffect} from 'react'
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from "./Card";
const Home = () => {
    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setProductBySell(data)
            }
        })
    }
    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setProductByArrival(data)
            }
        })
    }

    useEffect (()=>{
        loadProductsByArrival();
        loadProductsBySell();
    },[])
    return (
        <Layout title="Home Page" description = "Node React E-commerce App" className="container-fluid"> 
        
        <h2 className="mb-4"> New Arrival</h2>
        <div className="row">
        {productByArrival.map((product, index) => (
            <Card key = {index} product={product}/>
        ))}
        </div>

        <h2 className="mb-4"> Best Sellers</h2>
        <div className="row">
        {productBySell.map((product, index) => (
            <Card key = {index} product={product}/>
        ))}
        </div>

        </Layout>
    ); 
};

export default Home
