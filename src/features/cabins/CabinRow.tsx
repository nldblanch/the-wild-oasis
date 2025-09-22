import styled from "styled-components";
import type { Cabin } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import CabinForm from "./CabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

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
  cabin: Cabin;
}

function CabinRow({ cabin }: CabinRowProps) {
  const { id, name, max_capacity, discount, image, regular_price } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const isWorking = isDeleting || isCreating;
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      max_capacity,
      discount,
      image,
      regular_price,
      description: cabin.description
    });
  }

  return (
    <Table.Row>
      <Img src={image ?? ""} />
      <CabinName>{name}</CabinName>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price ?? 0)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount ?? 0)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDuplicate} disabled={isWorking}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button disabled={isWorking}>
              <HiPencil />
            </button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button disabled={isWorking}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              onConfirm={() => deleteCabin(id)}
              disabled={isWorking}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
