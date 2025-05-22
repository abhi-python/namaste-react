import React, { useContext } from 'react'
import { CDN_URL } from '../utils/constants'
import userContext from '../utils/userContext'

const RestaurentCard = (props) => {
    const {name,avgRating,cuisines,costForTwo, sla, cloudinaryImageId} = props?.resData?.info || {}
    const {loggedInUser} = useContext(userContext);
  return (
    <div className='m-4 p-4 flex flex-col bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md w-60 min-h-[380px]'>
        <img className='w-full h-40 object-cover rounded-md' src={CDN_URL + cloudinaryImageId} alt='res-logo' />
        <div className='flex flex-col flex-1 justify-between mt-4'>
          <h3 className='font-bold text-lg'>{name}</h3>
          <h4>{avgRating} Star</h4>
          <h4 className='text-sm text-gray-600'>{cuisines.join(", ")}</h4>
          <h4 className='text-sm'>{costForTwo}</h4>
          <h4 className='text-sm'>{sla?.slaString}</h4>
          <h4 className='text-sm font-bold'>{loggedInUser}</h4>
        </div>
    </div>
  )
}

export const withVegLabel = (RestaurentCard) => {
  return (props) => {
    return (
        <div>
        <label className='absolute bg-green-400 text-white m-2 p-2 rounded-lg'>Veg</label>
        <RestaurentCard {...props} />
        </div>
    );
  };
}

export default RestaurentCard