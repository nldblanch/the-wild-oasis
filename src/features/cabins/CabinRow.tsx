import styled from "styled-components";
import type { Cabin } from "../../types";
import { formatCurrency } from '../../utils/helpers'
import { useState } from "react";
import CabinForm from "./CabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: Cabin
}

function CabinRow({ cabin }: CabinRowProps) {
  const [showForm, setShowForm] = useState(false)

  const { id, name, max_capacity, discount, image, regular_price } = cabin
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { createCabin, isCreating } = useCreateCabin()
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      max_capacity, discount, image, regular_price, description: cabin.description
    })
  }

  return (
    <>
      <TableRow role='row'>
        <Img src={image ?? ''} />
        <CabinName>{name}</CabinName>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price ?? 0)}</Price>
        {discount ? <Discount>{formatCurrency(discount ?? 0)}</Discount> : <span>&mdash;</span>}
        <div>
          <button onClick={handleDuplicate}><HiSquare2Stack /></button>
          <button onClick={() => setShowForm(show => !show)}>
            <HiPencil />
          </button>
          <button
            onClick={() => deleteCabin(id)}
            disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;