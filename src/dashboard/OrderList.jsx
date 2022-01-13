import React, { useState } from "react";
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
  { field: "id", headerName: "Prod Id", width: 160 },

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
  const [rows, setrows] = useState([]);
  const [Error, setError] = useState({
    text: "",
    title: "",
    isClosed: false,
  });
  const [btnId, setbtnId] = useState("");
  const [bool, setbool] = useState(false);
  const [getSelectedItem, setgetSelectedItem] = useState([]);
  const getRowDataID = (e) => {
    setgetSelectedItem((getSelectedItem) => [e.selection]);
  };

  React.useEffect(() => {
    setrows([]);
    getDocs(collection(getFirestore(), "post")).then((doc) => {
      doc.forEach((docs) => {
        // let docData = docs.data();
        console.log(docs.data());
        setrows((rows) => [
          ...rows,
          {
            pid: docs.data().userID,
            username: docs.data().username,
            Product: docs.data().name,
            price: docs.data().price,
            tag: docs.data().tag,
            isVerified: docs.data().verified,
            id: docs.id,
          },
        ]);
      });
    });
  }, [bool]);

  const Delete = (e) => {
    if (getSelectedItem[0].length) {
      console.log(e.target.id, getSelectedItem);
      setbtnId(e.target.id);
      setError({
        ...Error,
        isClosed: true,
        text: "Are you sure want to delete this listning ?",
      });
    } else {
      setError({
        ...Error,
        isClosed: true,
        text: "Please Select listning",
      });
    }
  };
  const Verify = (e) => {
    if (getSelectedItem[0].length > 0) {
      console.log(e.target.id, getSelectedItem);
      setbtnId(e.target.id);
      setError({
        ...Error,
        isClosed: true,
        text: "Are you sure want to verify this listning ?",
      });
     
    } else {
      setError({
        ...Error,
        isClosed: true,
        text: "Please Select listning",
      });
    }
  };

  const Action = () => {
    setError({
      ...Error,
      isClosed: false,
    });
    if (btnId === "del") {
      getSelectedItem[0].forEach((id) => {
        deleteDoc(doc(getFirestore(), "post", id))
          .then(() => {
            console.log("deleted");
            setbtnId("");
            setError({
              ...Error,
              isClosed: true,
              text: "Selected listning Has Been Deleted.",
            });
            setbool(!bool);
          })
          .catch((error) => {
            console.log("delete error", error);
          });
      });
    } else if (btnId === "verify") {
      getSelectedItem[0].forEach((id) => {
        updateDoc(doc(getFirestore(), "post", id), {
          verified: true,
        })
          .then(() => {
            setbtnId("");
            console.log("verified");
            setError({
              ...Error,
              isClosed: true,
              text: "Selected listning Has Been Verified.",
            });
            setbool(!bool);
          })
          .catch((error) => {
            console.log("upade error: ", error);
          });
      });
    } else {
      console.log("somthing went wrong");
      setError({
        ...Error,
        isClosed: false,
      });
    }
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
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={(e) => console.log(e)}
          onStateChange={getRowDataID}
        />
      </div>
      <div className="table-btn">
        <button onClick={Delete} id="del" className="delete">
          delete
        </button>
        <button onClick={Verify} id="verify" className="verify">
          verify
        </button>
      </div>
      <ResponsiveDialog
        isOpen={Error.isClosed}
        close={() => setError({ ...Error, isClosed: false })}
        text={Error.text}
        title={Error.title}
        event={Action}
      />
    </>
  );
}
