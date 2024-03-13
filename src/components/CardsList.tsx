import CardItemMini from './CardItemMini';
import classes from './CardList.module.css';
import { useAppSelector } from '../store/store';

const CardsList: React.FC = () => {
  const {cards} = useAppSelector((state) => state.userCards);
  return (
    <>
      <ul className={classes.cardList}>
        {cards.map((card) => (
          <CardItemMini key={card.id} card={card} />
        ))}
      </ul>
    </>

  );
};

export default CardsList;

// import { useEffect, useState } from "react";
// import CardItemMini from './CardItemMini';
// import { fetchCards } from '../http';
// import { TCard } from "../types/types";
// import classes from './CardList.module.css';
// import Button from "../components/UI/Button";


// const CardsList: React.FC = () => {
//   const [cards, setCards] = useState<TCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   console.log(cards)

//   useEffect(() => {
//     const fetchUserCards = async () => {
//       setIsLoading(true);
//       try {
//         const cards = await fetchCards();
//         setCards(cards);
//       } catch (error) {
//         console.log(error);
//         setError(error);
//       }
//       setIsLoading(false);
//     };

//     fetchUserCards();
//   }, [])

//   return (
//     <>
//       <div>
//         <Button url="new">Создать карточку</Button>
//         <Button url="">Начать тренировку</Button>
//       </div>
//       <ul className={classes.cardList}>
//         {cards.map((card) => (
//           <CardItemMini key={card.id} card={card} />
//         ))}
//       </ul>
//     </>

//   );
// };

// export default CardsList;