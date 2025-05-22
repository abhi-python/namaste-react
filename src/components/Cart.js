import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemList from './ItemList';
import { clearCart } from '../utils/cartSlice';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch()

    console.log(cartItems);

    const hanldeClearCart = () => {
        dispatch(clearCart());
    }
  return (
    <div className='text-center m-4 p-4'>
        <h1 className='font-bold text-2xl'>Cart</h1>
        <div className='w-6/12 m-auto'>
            <button className='m-2 p-2 bg-black text-white rounded-lg font-bold cursor-pointer' onClick={hanldeClearCart}>Clear Cart</button>
            {cartItems.length === 0 ? <h1 className='font-bold text-lg'>Cart is Empty. Add items to the cart!</h1> : <ItemList items={cartItems} />}
        </div>
    </div>
  )
}

export default Cart