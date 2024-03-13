import classes from './CardForm.module.css';
import { Button } from './UI/Button';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchCardData, sendCardData, updateCardData } from '../store/cards-actions';
import { useNavigate } from 'react-router-dom';
import { fetchCardsData } from '../store/cards-actions';
import { TCard } from '../types/types';
import { useEffect, useState } from 'react';

type Props = {
  method: string;
  cardId?: string;
};

const CardForm: React.FC<Props> = ({ method, cardId }) => {
  const [selectedCard, setSelectedCard] = useState<TCard>({
    id: '',
    text: '',
    translate: ''
  });
  const loading = useAppSelector(state => state.userCards.loading)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const card = await dispatch(fetchCardData(cardId || ''));
        if (card) {
          setSelectedCard({
            id: cardId,
            text: card.text,
            translate: card.translate,
          })
        }
      } catch (error) {
        console.log('Памагити', error);
      }
    };

    if (cardId) {
      fetchData();
    }
  }, [cardId, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const text = fd.get("text") as string;
    const translate = fd.get("translate") as string;

    const cardData: Omit<TCard, 'id'> = {
      text,
      translate,
    }

    if (method === "post") {
      await dispatch(sendCardData(cardData));
    }

    if (method === "patch") {
      await dispatch(updateCardData(cardId || '', cardData));
    }

    await dispatch(fetchCardsData());
    navigate('/cards')
  };

  if (loading) {
    return <p>ЗАГРУЗКА!!!</p>
  }

  return (
    <>
      <div className={classes.formInner}>
        {!loading && selectedCard && (
          <form method={method} className={classes.cardForm} onSubmit={handleSubmit}>
            <input className={classes.field} autoComplete="off" type="text" defaultValue={cardId ? selectedCard.text : ''} id="text" name="text" placeholder='Введите слово или фразу' required />
            <input className={classes.field} autoComplete="off" type="text" defaultValue={cardId ? selectedCard.translate : ''} id="translate" name="translate" placeholder='Введите перевод' required />
            <Button type="submit">{cardId ? 'Сохранить' : 'Создать'}</Button>
          </form>
        )}
      </div>
    </>
  );
};

export default CardForm;