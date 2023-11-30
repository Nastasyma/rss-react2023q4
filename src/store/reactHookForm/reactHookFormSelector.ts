import { RootState } from '../store';

export const selectReactHookFormName = (state: RootState): string => state.reactHookForm.name;

export const selectReactHookFormAge = (state: RootState): number => state.reactHookForm.age;

export const selectReactHookFormEmail = (state: RootState): string => state.reactHookForm.email;

export const selectReactHookFormPassword = (state: RootState): string =>
  state.reactHookForm.password;

export const selectReactHookFormConfirmPassword = (state: RootState): string =>
  state.reactHookForm.confirmPassword;

export const selectReactHookFormGender = (state: RootState): string => state.reactHookForm.gender;

export const selectReactHookFormPicture = (state: RootState): string => state.reactHookForm.picture;

export const selectReactHookFormCountry = (state: RootState): string => state.reactHookForm.country;

export const selectReactHookFormAccept = (state: RootState): boolean => state.reactHookForm.accept;
