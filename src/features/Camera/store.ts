import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api, loadable } from 'utils';
import { Loadable } from 'types';
import { Photos, CameraMode } from './types';

const initialState: {
  cameraMode: CameraMode;
  photoTaken: boolean;
  photos: Loadable<Photos>;
} = {
  cameraMode: 'user',
  photoTaken: false,
  photos: loadable
};

export const getPhotos = createAsyncThunk('photos/getPhotos', async () => {
  const [error, response] = await api.get('/photos.json');
  if (!error) return response.photos;
});

const cameraSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhoto: {
      reducer(state, action: PayloadAction<{ time: Date; dataURL: string }>) {
        const { time, dataURL } = action.payload;
        if (state.photoTaken) {
          state.photos[0].data.images.unshift(action.payload.dataURL);
        } else {
          state.photoTaken = true;
          state.photos.data.unshift({
            month: time.toLocaleString('default', { month: 'long' }),
            year: time.getFullYear(),
            images: [dataURL]
          });
        }
      },
      prepare(dataURL: string) {
        return {
          payload: {
            dataURL,
            time: new Date()
          }
        };
      }
    },
    toggleCameraMode(state) {
      state.cameraMode = state.cameraMode === 'user' ? 'environment' : 'user';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, ({ photos }) => {
      photos.loading = true;
    });
    builder.addCase(getPhotos.fulfilled, ({ photos }, { payload }) => {
      photos.loading = false;
      if (payload) photos.data = payload;
      else photos.error = true;
    });
    builder.addCase(getPhotos.rejected, ({ photos }) => {
      photos.loading = false;
      photos.error = true;
    });
  }
});

export const { setPhoto, toggleCameraMode } = cameraSlice.actions;

export default cameraSlice.reducer;
