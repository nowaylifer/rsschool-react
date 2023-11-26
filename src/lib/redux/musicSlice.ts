import { AnyAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SimplifiedAlbum } from '@/types';
import musicApi from './musicApi';
import { HYDRATE } from 'next-redux-wrapper';

interface MusicState {
  searchQuery: string;
  items: SimplifiedAlbum[];
  page: number;
  pageSize: number;
  searchIsLoading: boolean;
  detailsIsLoading: boolean;
}

const initialState: MusicState = {
  searchQuery: '',
  items: [],
  page: 1,
  pageSize: 20,
  searchIsLoading: false,
  detailsIsLoading: false,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(HYDRATE, (state, action: AnyAction) => ({
        ...state,
        ...action.payload[musicSlice.name],
      }))
      .addMatcher(isAnyOf(musicApi.endpoints.albumSearch.matchPending), (state, action) => {
        state.searchIsLoading = true;
        state.searchQuery = action.meta.arg.originalArgs.q;
        state.pageSize = action.meta.arg.originalArgs.pageSize;
        state.page = action.meta.arg.originalArgs.page;
      })
      .addMatcher(isAnyOf(musicApi.endpoints.albumSearch.matchFulfilled), (state, action) => {
        state.searchIsLoading = false;
        state.items = action.payload.data;
      })
      .addMatcher(isAnyOf(musicApi.endpoints.albumSearch.matchRejected), (state) => {
        state.searchIsLoading = false;
      })
      .addMatcher(isAnyOf(musicApi.endpoints.albumDetails.matchPending), (state) => {
        state.detailsIsLoading = true;
      })
      .addMatcher(isAnyOf(musicApi.endpoints.albumDetails.matchFulfilled), (state) => {
        state.detailsIsLoading = false;
      })
      .addMatcher(isAnyOf(musicApi.endpoints.albumDetails.matchRejected), (state) => {
        state.detailsIsLoading = false;
      });
  },
});

export default musicSlice;
