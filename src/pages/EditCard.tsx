import { useParams } from "react-router-dom";
import CardForm from "../components/CardForm";

const EditCardPage = () => {
  const params = useParams();
  return (
    <>
      <h2 className="visually-hidden">Редактирование карточки</h2>
      <CardForm method="patch" cardId={params.cardId || ''} />
    </>
  );
};

export default EditCardPage;