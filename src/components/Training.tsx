import { useReducer } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useAppSelector } from '../store/store';
import classes from './Training.module.css';

type CardProps = {
  text: string;
  translate: string;
  visibility: string;
  onChangeVisibility: () => void
}

const TrainingCard: React.FC<CardProps> = ({ text, translate, visibility, onChangeVisibility }) => {

  return (
    <div onClick={onChangeVisibility} className={classes.trainingCard}>
      {visibility === 'text' && (
        <div className={`${classes.cardInner} ${classes.trainingText}`}>
          <p>{text}</p>
        </div>)}
      {visibility === 'translate' && (
        <div className={`${classes.cardInner} ${classes.trainingTranslate}`}>
          <p>{translate}</p>
        </div>)}
    </div>
  );
};

type CardState = {
  lang: string,
  visibility: string,
  currentCardIndex: number,
};

type CardAction =
  | { type: 'CHANGE_LANG' }
  | { type: 'NEXT_CARD'; cardsLength: number }
  | { type: 'PREV_CARD' }
  | { type: 'TOGGLE_VISIBILITY' };

const initialCardState: CardState = {
  lang: 'originalText',
  visibility: 'text',
  currentCardIndex: 0,
};

const cardReducer = (state: CardState, action: CardAction) => {
  switch (action.type) {
    case 'CHANGE_LANG':
      return {
        ...state,
        lang: state.lang === 'originalText' ? 'translateText' : 'originalText',
        visibility: state.lang === 'originalText' ? 'translate' : 'text'
      };
    case 'NEXT_CARD':
      return {
        ...state,
        currentCardIndex: state.currentCardIndex === (action.cardsLength - 1) ? state.currentCardIndex : state.currentCardIndex + 1,
        visibility: state.lang === 'originalText' ? 'text' : 'translate'
      };
    case 'PREV_CARD':
      return {
        ...state,
        currentCardIndex: state.currentCardIndex === 0 ? state.currentCardIndex : state.currentCardIndex - 1,
        visibility: state.lang === 'originalText' ? 'text' : 'translate'
      };
    case 'TOGGLE_VISIBILITY':
      return {
        ...state,
        visibility: state.visibility === 'text' ? 'translate' : 'text'
      };
    default:
      return state;
  }
};

export const Training = () => {
  const { cards } = useAppSelector((state) => state.userCards);
  const [cardState, cardDispatch] = useReducer(cardReducer, initialCardState);


  const handleNext = () => {
    cardDispatch({ type: 'NEXT_CARD', cardsLength: cards.length });
  }

  const handlePrev = () => {
    cardDispatch({ type: 'PREV_CARD' })
  }

  const changeModeHandler = () => {
    cardDispatch({ type: 'CHANGE_LANG' })
  }

  const handleVisibility = () => {
    cardDispatch({ type: 'TOGGLE_VISIBILITY' })
  };

  return (
    <>
      {!cards && <p>Что-то пошло не так...</p>}
      {cards.length < 1 && <p>У вас еще нет ни одной карточки!</p>}
      {cards && cards.length > 0 && (
        <section className={classes.trainingMode}>
          <div className="container">
            <div className={classes.trainingModeInner}>
              <TrainingCard
                text={cards[cardState.currentCardIndex].text}
                translate={cards[cardState.currentCardIndex].translate}
                visibility={cardState.visibility}
                onChangeVisibility={handleVisibility}
              />
              <div className={classes.cardActions}>
                <button
                  disabled={cardState.currentCardIndex === 0}
                  onClick={handlePrev}
                  className={`${classes.cardButton} ${cardState.currentCardIndex === 0 ? 'cardButtonDisabled' : ''} gradientOrange`}>
                  <span className="visually-hidden">Назад</span>
                  <IoIosArrowBack style={{ color: "#fff" }} />
                </button>
                <button
                  disabled={cardState.currentCardIndex === cards.length - 1}
                  onClick={handleNext}
                  className={`${classes.cardButton} ${(cardState.currentCardIndex === cards.length - 1) ? 'cardButtonDisabled' : ''} gradientOrange`}>
                  <span className="visually-hidden">Вперед</span>
                  <IoIosArrowForward style={{ color: "#fff" }} />
                </button>
                <button onClick={changeModeHandler} className={`${classes.cardButton} gradientOrange`}>Переключить язык</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

