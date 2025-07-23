import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  channel: null,
  loading: false,
  error: null,
  successMessage: null,
};

// 1. Create a Channel
export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async (channelData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/channel/create",
        channelData,
        {
          withCredentials: true, // ✅ send cookie
        }
      );
      return response.data.channel;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create channel"
      );
    }
  }
);

// 2. Get Channel Data
export const getChannel = createAsyncThunk(
  "channel/data",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/channel/data/${channelId}`,
        {
            withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch channel data"
      );
    }
  }
);

// 3. Update Channel
export const updateChannel = createAsyncThunk(
  "channel/updateChannel",
  async ({ channelId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/channel/update/${channelId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update channel"
      );
    }
  }
);

// 4. Delete Channel
export const deleteChannel = createAsyncThunk(
  "channel/delete",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/channel/delete/${channelId}`,
        {
          withCredentials: true,
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete channel"
      );
    }
  }
);

// 5. Subscribe to Channel
export const subscribeChannel = createAsyncThunk(
  "channel/subscribe",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/v1/channel/subscribe/${channelId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to subscribe channel"
      );
    }
  }
);

// 6. Unsubscribe from Channel
export const unsubscribeChannel = createAsyncThunk(
  "channel/unsubscribe",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/v1/channel/unsubscribe/${channelId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to unsubscribe channel"
      );
    }
  }
);

// **Slice Definition**
const channelSlice = createSlice({
    name: "channel", 
    initialState,    

    // **Synchronous Reducers**
    reducers: {
        // Clears any existing error message in the state
        clearError(state) {
            state.error = null;
        },
        // Clears any existing success message in the state
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
    },

    // **Extra Reducers: Handles async thunk states (pending, fulfilled, rejected)**
    extraReducers: (builder) => {
        // Handle createChannel actions
        builder
            .addCase(createChannel.pending, (state) => {
                state.loading = true;          
                state.error = null;            
                state.successMessage = null;   
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.loading = false;
                state.channel = action.payload; // Store newly created channel data
                state.successMessage = "Channel created successfully!";
            })
            .addCase(createChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;   // Store error message
            });

        // Handle getChannel actions
        builder
            .addCase(getChannel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChannel.fulfilled, (state, action) => {
                state.loading = false;
                state.channel = action.payload; // Update channel data in the state
            })
            .addCase(getChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;   // Store error message
            });

        // Handle updateChannel actions
        builder
            .addCase(updateChannel.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                state.loading = false;
                state.channel = action.payload; // Update channel data
                state.successMessage = "Channel updated successfully!";
            })
            .addCase(updateChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle deleteChannel actions
        builder
            .addCase(deleteChannel.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteChannel.fulfilled, (state) => {
                state.loading = false;
                state.channel = null; // Clear channel data after deletion
            })
            .addCase(deleteChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle subscribeChannel actions
        builder
            .addCase(subscribeChannel.fulfilled, (state) => {
                state.loading = false; // No additional state changes required
            })
            .addCase(subscribeChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle unsubscribeChannel actions
        builder
            .addCase(unsubscribeChannel.fulfilled, (state) => {
                state.loading = false; // No additional state changes required
            })
            .addCase(unsubscribeChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearError, clearSuccessMessage } = channelSlice.actions;


export default channelSlice.reducer;