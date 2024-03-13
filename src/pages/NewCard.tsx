import CardForm from '../components/CardForm';

const NewCardPage = () => {
  return (
    <>
      <h2 className="visually-hidden">Создание новой карточки</h2>
      <CardForm method="post"/>
    </>
  );
};

export default NewCardPage;