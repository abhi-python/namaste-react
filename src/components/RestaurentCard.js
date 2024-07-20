import React from 'react'
import { CDN_URL } from '../utils/constants'

const RestaurentCard = (props) => {
    const {name,avgRating,cuisines,costForTwo, sla, cloudinaryImageId} = props?.resData?.info || {}
  return (
    <div className='res-card'>
        <img className='res-logo' src={CDN_URL + cloudinaryImageId} alt='res-logo' />
        <h3>{name}</h3>
        <h4>{avgRating} Star</h4>
        <h4>{cuisines}</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla?.slaString}</h4>
    </div>
  )
}

export default RestaurentCard