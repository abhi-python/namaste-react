import React, { useEffect, useState } from 'react'
import RestaurentCard from './RestaurentCard'

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([])
    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.9336628&lng=75.7894008&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json()
        console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }
    useEffect(() => {
        fetchData();
    }, [])
  return (
    <div className='body'>
        <div className='search'>
            <button>Top Rated Restaurents</button>
        </div>
        <div className='res-container'>
            {listOfRestaurants.map((restaurant) => (
            <RestaurentCard key={restaurant?.info?.id} resData = {restaurant} />
            ))}
        </div>
    </div>
  )
}

export default Body