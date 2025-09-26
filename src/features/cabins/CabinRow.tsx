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
import Menus from "../../ui/Menus";
import { BREAKPOINTS } from "../../utils/constants";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`;
const MobileImg = styled.img`
  display: none;
  max-width: 16rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    display: block;
    margin: 0 auto;
  }
`;
const Wrapper = styled.div`
  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
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
  const {
    id: cabinId,
    name,
    max_capacity,
    discount,
    image,
    regular_price
  } = cabin;
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
    <Wrapper>
      <MobileImg src={image ?? ""} />
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
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />

              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isWorking}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </Wrapper>
  );
}

export default CabinRow;
