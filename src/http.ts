import {type TCard} from './types/types';

type CardsFromServer = {
  [key: string]: Omit<TCard, "id">;
};

type newCard = Omit<TCard, "id">

export const fetchCards = async() => {
  const response = await fetch('https://memoize-632fa-default-rtdb.europe-west1.firebasedatabase.app/cards.json');
  const data: CardsFromServer = await response.json();
  const arrayData = Object.keys(data).map(key => (
    {
      id: key,
      ...data[key]
    }
  ));

  if (!response.ok) {
    throw new Error('Ошибка загрузки карточек');
  }

  return arrayData;
};

export const fetchCard = async(id: string) => {
  const response = await fetch(`https://memoize-632fa-default-rtdb.europe-west1.firebasedatabase.app/cards/${id}.json`);
  const data: Omit<TCard, "id"> = await response.json();

  if (!response.ok) {
    throw new Error('Ошибка загрузки карточки');
  }

  return data;
};

export const sendCard = async(card: newCard) => {
  const response = await fetch(
    'https://memoize-632fa-default-rtdb.europe-west1.firebasedatabase.app/cards.json',
    {
      method: 'POST',
      body: JSON.stringify(card),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );

  if (!response.ok) {
    throw new Error('Sending card data failed.');
  }
}

export const updateCard = async(id: string, updatedCard: Omit<TCard, 'id'>) => {
  const response = await fetch(
    `https://memoize-632fa-default-rtdb.europe-west1.firebasedatabase.app/cards/${id}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify(updatedCard),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );

  if (!response.ok) {
    throw new Error('Updating card data failed.');
  }
}

export const removeCard = async(id: string) => {
  const response = await fetch(
    `https://memoize-632fa-default-rtdb.europe-west1.firebasedatabase.app/cards/${id}.json`,
    {
      method: 'DELETE'
    }
  );

  if (!response.ok) {
    throw new Error('Sending card data failed.');
  }
}