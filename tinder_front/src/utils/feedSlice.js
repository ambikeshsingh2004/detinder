import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({

  name:'feed',
  initialState:null,
  reducers:{
    addFeed:(state,action)=>{
      return action.payload
    }
    ,removeFeed:(state,action)=>{
     const newArray = state.filter((r )=> r._id !== action.payload)
     return newArray;
    }
  }
})

export default feedSlice.reducer;
export const {addFeed,removeFeed} = feedSlice.actions;