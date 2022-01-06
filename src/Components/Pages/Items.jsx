import { HomeCard } from "../../data";
import { Card2 } from "../Card/Card";
import "./style.css";

export const Items = () => {

  return (
    <div className="items-container">
      {/* <Filter/> */}
      {HomeCard.map((data, index) => {
        return (
            <Card2
             key={index}
              id={data.id}
              itemImage={data.image}
              title={data.title}
              price={data.price}
            />
        );
      })}
    </div>
  );
};
