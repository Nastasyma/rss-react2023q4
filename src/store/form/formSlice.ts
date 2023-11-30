import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IData } from '../../utils/types';

const initialState: IData = {
  name: 'Jhon Doe',
  age: 33,
  email: 'info@gmail.com',
  password: 'qwerty123',
  confirmPassword: 'qwerty123',
  gender: 'Male',
  picture: '',
  country: 'Australia',
  accept: true,
};

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    formDataList: [initialState],
  },
  reducers: {
    setFormData: (state, action: PayloadAction<IData>) => {
      state.formDataList.push(action.payload);
    },
    setBorderStyle: (state, action: PayloadAction<{ index: number; borderStyle: string }>) => {
      const { index, borderStyle } = action.payload;
      state.formDataList[index].borderStyle = borderStyle;
    },
  },
});

export const { reducer: cardsListReducer } = formSlice;

export const { setFormData, setBorderStyle } = formSlice.actions;
