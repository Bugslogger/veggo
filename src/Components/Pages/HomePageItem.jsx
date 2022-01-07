import Card from '../Card/Card';
import React from 'react';
import './style.css';
import { HomeCard } from '../../data';
import { Link } from 'react-router-dom';
import { Filter } from '../Comp';

const HomePageItem = () => {
    const filterArray = ["Rating","price"]
    return (
        <>
        <Filter style={{width: "100%"}} filter={filterArray}/>
        <p className='subtopicname'>Top Rated Shops</p>
        <div className="topratedshop">  
            {
                HomeCard.slice(0,6).map((cData,index)=>{
                    return(
                        <Link to="/items" key={index}>
                            <Card
                                itemImage={cData.image}
                                title={cData.title}
                                rating={cData.rating}
                                desc={cData.desc}
                                price={cData.price}
                            />
                        </Link>
                    )
                }) 
            }
        </div>
        <p className='subtopicname'>Bestseller Shops</p>
        <div className='home-page-item-container'>
            {
                HomeCard.map((cData,index)=>{
                    return(
                        <Link to="/items" key={index} >
                            <Card
                                itemImage={cData.image}
                                title={cData.title}
                                rating={cData.rating}
                                desc={cData.desc}
                                price={cData.price}
                            />
                        </Link>
                    )
                })
            }
        </div>
        </>
    )
}

export default HomePageItem
