import { HomeCard } from "../../data";
import { Card2 } from "../Card/Card";
import { Filter } from "../Comp";
import "./style.css";

export const Items = () => {
  const filterArray = ["Catagory","price"]
  return ( <><Filter filter={filterArray}/>
    <div className="items-container">
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
    </div></>
  );
};
