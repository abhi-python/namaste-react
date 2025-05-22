import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';

const RestaurantMenu = () => {

    const [showIndex, setShowIndex] = useState(null);

    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId)

    if(resInfo === null) return <Shimmer />

    const {name, cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
    console.log("cat", categories)

  return (
    <div className='text-center'>
        <h1 className='font-bold my-6 text-2xl'>{name}</h1>
        <p className='font-bold text-lg'>{cuisines.join(", ")} - {costForTwoMessage}</p>
        {/* category accordian */}
        {categories.map((category, index) => (
            <RestaurantCategory 
                data={category?.card?.card} 
                key={category?.card?.card?.categoryId} 
                showItems={index === showIndex}
                setShowIndex={() => setShowIndex((prevIndex) => prevIndex === index ? null : index)}
            />
        ))}
    </div>
  )
}

export default RestaurantMenu