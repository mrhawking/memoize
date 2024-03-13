import CardItem from "../components/CardItem";
import { useParams } from "react-router-dom";

const CardPage = () => {
  const param = useParams();
  console.log(param.cardId)

  return (
    <>
      <h1>Card Page</h1>
      <CardItem/>
    </>

  );
};

export default CardPage;