import setLocalStorage from "@/utils/localStorage/setLocalStorage";
import { createSlice } from "@reduxjs/toolkit";

export const gendersSlice = createSlice({
    name: 'genders',
    initialState: {
        gender: null
    },
    reducers : {
        updateGender: (state, action) => {
            state.gender = action.payload
            setLocalStorage('gender', action.payload)
        }
    }
});

export const {updateGender} = gendersSlice.actions;

export default gendersSlice.reducer;