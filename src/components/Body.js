import React, { useContext, useEffect, useState } from 'react'
import RestaurentCard, {withVegLabel} from './RestaurentCard'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import userContext from '../utils/userContext'

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [searchText, setSearchText] = useState("")
    const onlineStatus = useOnlineStatus()

    const RestaurantCardVeg = withVegLabel(RestaurentCard);
    const {loggedInUser, setUserName} = useContext(userContext)
    

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.9336628&lng=75.7894008&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json()
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log("list:", listOfRestaurants);

    if (onlineStatus === false) return <h1>Looks like you are offline!! Check your internet connection;</h1>

  return listOfRestaurants.length === 0 ? <Shimmer /> : (
    <div className='body'>
        <div className='flex items-center'>
            <div className='p-4 m-4'>
                <input type='text' className='border border-black' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button className='px-4 py-2 m-4 bg-green-200 rounded-sm cursor-pointer' onClick={() => {
                    const filteredRes = listOfRestaurants.filter(
                        (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                    );
                    setFilteredRestaurants(filteredRes)
                }}>
                    Search
                </button>
                <button className='px-4 py-2 bg-gray-200 rounded-sm cursor-pointer' onClick={() => {
                const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4
                );
                setFilteredRestaurants(filteredList);
            }}>
                Top Rated Restaurents
                </button>
            </div> 
            <div className='px-4 py-2'>
                    <label>UserName : </label>
                    <input type='text'className='border border-black p-2' value={loggedInUser} onChange={(e) => setUserName(e.target.value)} />
            </div>  
        </div>
        <div className='flex flex-wrap'>
            {filteredRestaurants.map((restaurant) => (
            <Link 
                to={"/restaurant/" + restaurant?.info?.id} 
                key={restaurant?.info?.id}
            >
                {restaurant?.info?.veg ? <RestaurantCardVeg resData = {restaurant}/> : <RestaurentCard resData = {restaurant} />}
            </Link>
            ))}
        </div>
    </div>
  )
}

export default Body