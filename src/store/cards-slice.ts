import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TCard } from '../types/types';

export interface CardsState {
  cards: TCard[];
  loading: boolean;
  error: string | null;
  changed: boolean;
  total: number;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
  changed: false,
  total: 0
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    replaceCards: (state, action: PayloadAction<TCard[]>) => {
      state.cards = action.payload;
      state.total = action.payload.length;
    },
    addCard: (state, action: PayloadAction<TCard>) => {
      state.cards.push(action.payload);
      state.total += 1;
      state.changed = true;
    },
    removeCard: (state, action: PayloadAction<string>) => {
      const existingIndex = state.cards.findIndex(card => card.id === action.payload);
      state.cards.splice(existingIndex, 1);
      state.total -= 1;
      state.changed = true;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    updateErrorState: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});


export const cardsActions = cardsSlice.actions;
// export const { replaceCards, addCard, removeCard } = cardsSlice.actions;

export default cardsSlice.reducer;