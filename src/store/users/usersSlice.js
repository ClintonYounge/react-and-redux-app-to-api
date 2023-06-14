import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://randomuser.me/api/?results=5";

const initialState = {
    users: [],
    isLoading: false,
    error: undefined,
}

export const getUsers = createAsyncThunk('users/getUsers', async (thunkAPI) => {
    try {
        const response = await axios(url);
        return response.data.results;
    } catch (error) {
        return thunkAPI.rejectWithValue('Error... something went wrong')
    }
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.isLoading = true;
            })

            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })

            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
    },
});

export const { isLoading, error } = usersSlice.actions;
export default usersSlice.reducer;
