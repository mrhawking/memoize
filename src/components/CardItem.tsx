import { type TCard } from '../types/types';
import classes from './CardItem.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCard } from '../http';


const CardItem: React.FC = () => {
  //ПОКА ЭТОТ КОМПОНЕНТ НЕ НУЖЕН
  //ЗАГРУЗКА И ОШИБКИ ТЕПЕРЬ В REDUX!!!!!!!!
  
  const params = useParams();
  const [currentCard, setCurrentCard] = useState<TCard | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<undefined | string>();

  useEffect(() => {
    async function getSingleCard() {
      setIsFetching(true);
      try {
        const card = await fetchCard(params.cardId || '');
        setCurrentCard(card);
      } catch (error) {
        setError('Ошибка загрузки данных');
      }
      setIsFetching(false);
    }
    getSingleCard();

  }, [params.cardId])

  if (isFetching) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <p>ERROR!!!!</p>
    );
  }
  return (
    <>
      {!currentCard && <p>Такой карточки не существует</p>}
      {currentCard  && (
        <div className={classes.cardItem}>
          <div className={classes.cardInner}>
            <p className={classes.originalText}>{currentCard.text}</p>
            <p className={classes.translate}>{currentCard.translate}</p>
          </div>
        </div>
      )}
    </>
  );

};

export default CardItem;