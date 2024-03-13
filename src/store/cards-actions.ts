import { cardsActions } from "./cards-slice";
import { Dispatch } from 'redux';
import { fetchCards, sendCard, removeCard, updateCard, fetchCard } from "../http";
import { type TCard } from "../types/types";

export const fetchCardsData = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(cardsActions.startLoading());
      const cardsData = await fetchCards();
      dispatch(cardsActions.replaceCards(cardsData));
      dispatch(cardsActions.stopLoading());
    } catch (error) {
      dispatch(cardsActions.updateErrorState('Ошибка загрузки данных карточек'));
      dispatch(cardsActions.stopLoading());
    }
  }
};

export const fetchCardData = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(cardsActions.startLoading());
      const cardData = await fetchCard(id);
      dispatch(cardsActions.stopLoading());
      return cardData;
    } catch (error) {
      dispatch(cardsActions.updateErrorState('Ошибка загрузки данных карточки'));
      dispatch(cardsActions.stopLoading());
    }
  };
};

export const sendCardData = (card: Omit<TCard, 'id'>) => {
  return async () => {
    try {
      await sendCard(card);
    } catch (error) {
      //Вернуть state к предыдущему сотсоянию
      console.log(error)
    }
  };
};

export const updateCardData = (id: string, updatedCard: Omit<TCard, 'id'>) => {
  return async () => {
    try {
      await updateCard(id, updatedCard);
    } catch (error) {
      //Вернуть state к предыдущему сотсоянию
      console.log(error)
    }
  };
};

export const removeCardData = (id: string) => {
  return async () => {
    try {
      await removeCard(id);
    } catch (error) {
      //Вернуть state к предыдущему сотсоянию
      console.log(error)
    }
  };
};