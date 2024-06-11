import React, { useEffect, useState } from "react";

//** Table Css */
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Button } from "reactstrap";
import ModalForm from "../../components/vendor-table/ModalForm";

import useJwt from "@src/auth/jwt/useJwt";

// ** Utils
import { isObjEmpty } from "@utils";

const index = () => {
  //** State */
  const [openFormModal, setOpenFormModal] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [supplyTypeList, setSupplyTypeList] = useState([]);

  //** handle form modal */
  const toggle = (row = {}) => {
    console.log({ row });
    if (!isObjEmpty(row)) {
      setEditRowData(row);
    }
    setOpenFormModal(!openFormModal);
  };

  async function getSupplyType(id = "") {
    try {
      const { data } = await useJwt.getSupplyType();
      console.log({ supplyTypeList: data });
    } catch (e) {}
  }

  async function getAccountTypes() {
    try {
      const { data } = await useJwt.getAccountType();
      console.log({ accountType: data });
    } catch (e) {}
  }

  useEffect(() => {
    getAccountTypes();
    getSupplyType();
  }, []);

  return (
    <div>
      <Button onClick={() => toggle()}>Add Vendor</Button>
      <ModalForm isOpen={openFormModal} toggle={toggle} />
    </div>
  );
};

export default index;
