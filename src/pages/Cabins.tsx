import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Row from "../ui/Row";
import { useState } from "react";
import CabinForm from "../features/cabins/CabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm(show => !show)}>Add new cabin</Button>
        {showForm && <CabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
