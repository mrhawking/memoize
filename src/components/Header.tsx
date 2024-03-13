import { useAppSelector } from "../store/store";
import { ButtonLink } from "./UI/Button";
import classes from './Header.module.css';

const Header = () => {
  const { total, loading } = useAppSelector(state => state.userCards);


  return (
    <>
      <header className={classes.header}>
        <div className="container">
          <div className={classes.headerInner}>
            <div className={classes.headerActions}>
              <ButtonLink url='/cards'>Все карточки</ButtonLink>
              <ButtonLink url='/train'>Начать тренировку</ButtonLink>
            </div>
            <p className={classes.headerText}>Карточек в вашей коллекции: <span>{loading ? '?' : total}</span></p>
          </div>
        </div>
      </header>
    </>

  );
}

export default Header;