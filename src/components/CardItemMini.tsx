import { type TCard } from "../types/types";
import { MdEdit, MdDelete } from "react-icons/md";
import classes from './CardItemMini.module.css';
import { useAppDispatch } from "../store/store";
import { cardsActions } from "../store/cards-slice";
import { removeCardData } from "../store/cards-actions";
import { Link } from "react-router-dom";

const CardItemMini: React.FC<{ card: TCard }> = ({ card }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(cardsActions.removeCard(id))
    dispatch(removeCardData(id));
  };

  return (
    <li className={classes.cardMini}>
      {/* <Link to={card.id || ''}> */}
        <div className={classes.cardMiniInner}>
          <p className={classes.text}>{card.text}</p>
          <p className={classes.translate}>{card.translate}</p>
        </div>
      {/* </Link> */}
      <div className={classes.actions}>
        <Link to={`${card.id}/edit` || ''} className={`${classes.button} gradientOrange`}>
          <span className="visually-hidden">Редактировать</span>
          <MdEdit />
        </Link>
        <button className={`${classes.button} gradientOrange`} onClick={() => card.id && handleDelete(card.id)}>
          <span className="visually-hidden">Удалить</span>
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default CardItemMini;