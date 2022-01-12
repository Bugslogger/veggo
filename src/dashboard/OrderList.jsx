import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./admin.css";
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import ResponsiveDialog from "./Dialogue";

const columns = [
  { field: "id", headerName: "User Id", width: 160 },

  { field: "username", headerName: "username", width: 130 },
  { field: "Product", headerName: "Product name", width: 130 },
  {
    field: "price",
    headerName: "price",
    type: "number",
    width: 75,
  },
  {
    field: "tag",
    headerName: "tag",
    width: 120,
  },
  {
    field: "isVerified",
    headerName: "Verified",
    width: 100,
  },
];

export default function DataTable() {
  const [row, setrow] = React.useState([]);
  const [Error, setError] = React.useState({
      text: "",
      title: "",
      isClosed: false,

  });

  React.useEffect(() => {
    getDocs(collection(getFirestore(), "post")).then((doc) => {
      doc.forEach((docs) => {
        let docData = docs.data();
        console.log(docs.data());
        setrow((row) => [
          ...row,
          {
            id: docData.userID,
            username: docData.username,
            Product: docData.name,
            price: docData.price,
            tag: docData.tag,
            isVerified: docData.verified,
            pid: docs.id,
          },
        ]);
      });
    });
  }, []);

  const Delete = () => {
    deleteDoc(doc(getFirestore(), "post", "id"));
  };

  const Verify = () => {
      setError({...Error, isClosed: true})
    // updateDoc(doc(getFirestore(), "post", "id"), {
    //   verified: true,
    // });
  };

  return (
    <>
      <h2
        style={{
          width: "96%",
          margin: "0 auto 20px auto",
          color: "rgba(128,128,128,0.6)",
          fontFamily: "var(--headFont)",
          letterSpacing: "2px",
        }}
      >
        Added Products
      </h2>
      <div style={{ height: 400 }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={(e) => console.log(e)}
          onStateChange={(e) => console.log("e", e)}
        />
      </div>
      <div className="table-btn">
        <button onClick={Delete} className="delete">
          delete
        </button>
        <button onClick={Verify} className="verify">
          verify
        </button>
      </div>
      <ResponsiveDialog isOpen={Error.isClosed} close={Error.isClosed} text={Error.text} title={Error.title} event="" />
    </>
  );
}
