import React from 'react'
import { ITEM_IMG_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartSlice';

const ItemList = ({items}) => {

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    }
  return (
    <div>
        {items.map((item) => (
            <div key={item.card.info.id} className='p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between'>
                <div className='w-9/12'>
                    <div className='py-2'>
                        <span className='font-bold'>{item.card.info.name}</span>
                        <span className='font-bold'> - ₹{item.card.info.defaultPrice/100 || item.card.info.price/100}</span>
                    </div>
                    <p className='text-xs text-gray-400 font-bold'>{item.card.info.description}</p>
                </div>
                <div className='w-3/12 p-4'> 
                    <div className='absolute'>
                        <button className='font-bold p-2 mx-16 rounded-lg shadow-lg bg-white text-green-400 border-gray-200 cursor-pointer' onClick={()=> handleAddItem(item)}>ADD</button>
                    </div>
                    {item.card.info.imageId && <img src={ITEM_IMG_URL + item.card.info.imageId} className='w-40' alt='item-img' />}
                </div>
            </div>
        ))}
    </div>
  )
}

export default ItemList