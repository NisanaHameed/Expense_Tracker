import {createSlice} from "@reduxjs/toolkit"; 

const initialState = {
    userToken:localStorage.getItem('userToken')?JSON.parse(localStorage.getItem('userToken')) : null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            
            state.userToken = action.payload;
            localStorage.setItem('userToken', JSON.stringify(action.payload));
        },
        userLogout:(state)=>{
            state.userToken = null;
            localStorage.removeItem('userToken');
        }
    }
})

export const { setUserDetails,userLogout } = userSlice.actions;

export default userSlice.reducer;