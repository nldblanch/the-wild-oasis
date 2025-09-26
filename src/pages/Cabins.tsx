import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { Suspense } from "react";
import CabinTableSkeleton from "../features/cabins/CabinsTableSkeleton";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <Suspense fallback={<CabinTableSkeleton />}>
          <CabinTable />
        </Suspense>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
