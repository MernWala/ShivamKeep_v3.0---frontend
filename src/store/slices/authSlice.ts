import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '../../schemas/interface';

export interface AuthFormData {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  formData: AuthFormData;
}

const initialState: AuthState = {
  user: null,
  token: null,
  formData: {
    name: '',
    email: '',
    password: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateAuthFormField: (state, action: PayloadAction<{ field: keyof AuthFormData; value: string }>) => {
      state.formData[action.payload.field] = action.payload.value;
    },
    resetAuthForm: (state) => {
      state.formData = {
        name: '',
        email: '',
        password: '',
      };
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout, updateAuthFormField, resetAuthForm } = authSlice.actions;
export default authSlice.reducer;