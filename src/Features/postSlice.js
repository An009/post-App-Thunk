import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts: [],
    status: 'idle', //loading / succeeded / failed 
    error: null
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(BASE_URL)
        return response.data;
    }
    catch (err) {
        return err.message
    }
});
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(BASE_URL, initialPost)
        return response.data
    }
    catch (err) {
        return err.message
    }
})
export const editPost = createAsyncThunk('posts/editPost', async(initialPost)=>{
    const {id} = initialPost;
    try{
        const response = await axios.put(`${BASE_URL}/${id}`,initialPost)
        return response.data;
    }
    catch(err){
        //return err.message
        return initialPost;
    }
})
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            like: 0,
                            wow: 0,
                            heart: 0
                        }
                    }
                }
            }
        },
        addReactions: (state, action) => {
            const { postId, reaction } = action.payload
            const selectedPost = state.posts.find((post) => post.id === postId)
            if (selectedPost) {
                selectedPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'pending'
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                //adding extra properties to fetched object via api
                let min = 1;
                //console.log(action.payload)
                const loadedPost = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        like: 0,
                        wow: 0,
                        heart: 0
                    }
                    return post;
                });
                state.posts = state.posts.concat(loadedPost)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    like: 0,
                    wow: 0,
                    heart: 0
                }
                state.posts.push(action.payload)
            })
            .addCase(editPost.fulfilled, (state,action)=>{
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const {id} = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter((post)=>post.id !== id)
                state.posts = [...posts, action.payload];
            })
    }
});
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
export const { addPost, addReactions } = postSlice.actions;
export default postSlice.reducer;
