import { HomeCard } from "../../data";
import { Card2 } from "../Card/Card";
import { Filter } from "../Comp";
import "./style.css";
import {getFirestore, getDocs, collection, query, where} from 'firebase/firestore';
import { useEffect, useState } from "react";


export const Items = () => {

  const [GetDetails, setGetDetails] = useState([]);

  useEffect(() => {
    getDocs(query(collection(getFirestore(), 'post'), where("verified","==",true)))
    .then(doc=>{
      doc.forEach(docs=>{
        setGetDetails(GetDetails=>[...GetDetails, {data: docs.data(), id: docs.id}])
      })
    })
  }, [])

  const filterArray = ["Catagory","price"]
  return ( <><Filter filter={filterArray}/>
    <div className="items-container">
      {
      
      GetDetails.map((data, index) => {
        return (
            <Card2
             key={index}
              id={data.id}
              itemImage={data.data.image}
              title={data.data.name}
              price={data.data.price}
            />
        );
      })
      
      }
    </div></>
  );
};
