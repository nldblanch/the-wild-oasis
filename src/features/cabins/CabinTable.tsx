import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import type {
  Cabin,
  CabinSortableKeys,
  FilterOption,
  SortValues
} from "../../types";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading || !cabins) return <Spinner />;

  const filterValue = (searchParams.get("discount") ||
    "all") as FilterOption["value"];

  const filteredCabins = cabins.filter((cabin) => {
    if (filterValue === "all") return true;
    if (filterValue === "no-discount") return cabin.discount === 0;
    if (filterValue === "with-discount") return cabin.discount > 0;
    return true;
  });

  const sortBy = (searchParams.get("sortBy") || "name-asc") as SortValues;
  const [field, direction] = sortBy.split("-");
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const sortField = field as CabinSortableKeys;

    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      const result = aValue.localeCompare(bValue);
      return direction === "asc" ? result : -result;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      const result = aValue - bValue;
      return direction === "asc" ? result : -result;
    }

    return 0;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
