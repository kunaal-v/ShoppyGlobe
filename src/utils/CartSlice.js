import { createSlice } from "@reduxjs/toolkit";

const CartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
    },
    reducers:{
        AddToCart:(state,action)=>
        {
            let item=state.items.find(item=>item.id==action.payload.id);
            const data={...action.payload,quantity:1};
            if(!item)
            {
                state.items.push(data);
            }
            else
            {
                item.quantity++;
            }
        },
        RemoveFromCart:(state,action)=>
        {
            let item=state.items.find(item=>item.id==action.payload.id);
            item.quantity--;
            if(item.quantity==0)
            {
                const data=state.items.filter(item=>item.id!=action.payload.id);
                state.items=data;
            }
        },
        ClearCart:(state)=>
        {
            state.items=[];
        }
    }
});
export const {AddToCart,RemoveFromCart,ClearCart}=CartSlice.actions;
export default CartSlice.reducer
