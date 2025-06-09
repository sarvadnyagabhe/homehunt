import {createSlice} from '@reduxjs/toolkit';
interface locationType {
  area_id: number | null;
  city_id: number | null;
  id: number | null;
  name: string;
  ranking: number | null;
  city_name: string;
  area_name: string;
  locality_name: string;
}
interface LocationSliceState {
  location: locationType;
}

const initialState: LocationSliceState = {
  location: {
    area_id: null,
    city_id: null,
    id: null,
    name: '',
    ranking: null,
    city_name: '',
    area_name: '',
    locality_name: '',
  },
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;
