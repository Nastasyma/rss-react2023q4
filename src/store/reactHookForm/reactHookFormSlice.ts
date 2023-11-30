import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IData } from '../../utils/types';

const initialState: IData = {
  name: '---',
  age: 15,
  email: '---',
  password: '---',
  confirmPassword: '---',
  gender: '---',
  picture: '',
  country: '---',
  accept: false,
};

export const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setReactHookFormName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setReactHookFormAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setReactHookFormEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setReactHookFormPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setReactHookFormConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setReactHookFormGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setReactHookFormPicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload;
    },
    setReactHookFormCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setReactHookFormAccept: (state, action: PayloadAction<boolean>) => {
      state.accept = action.payload;
    },
  },
});

export const { reducer: cardsListReducer } = reactHookFormSlice;

export const {
  setReactHookFormName,
  setReactHookFormAge,
  setReactHookFormEmail,
  setReactHookFormPassword,
  setReactHookFormConfirmPassword,
  setReactHookFormGender,
  setReactHookFormPicture,
  setReactHookFormCountry,
  setReactHookFormAccept,
} = reactHookFormSlice.actions;
