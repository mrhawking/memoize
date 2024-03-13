import CardsList from "../components/CardsList";
import { ButtonLink } from "../components/UI/Button";

const CardsPage = () => {
  return (
    <section style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <div className="container">
        <h2 className="visually-hidden">Страница с карточками</h2>
        <div>
          <ButtonLink url="new">Создать карточку</ButtonLink>
        </div>
        <CardsList />
      </div>
    </section>
  );
};

export default CardsPage;