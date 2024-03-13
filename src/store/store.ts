import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from './cards-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
  reducer: {
    userCards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;