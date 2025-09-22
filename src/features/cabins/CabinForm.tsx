import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import type { Cabin } from "../../types";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

interface FormFields {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: FileList;
}

interface CabinFormProps {
  cabinToEdit?: Cabin | null;
  onCloseModal?: () => void;
}

function CabinForm({ cabinToEdit = null, onCloseModal }: CabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(cabinToEdit?.id);

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<FormFields>({
    defaultValues: isEditSession ? editValues : {}
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      if (!editId) throw new Error("Cannot update without id");
      updateCabin(
        { ...data, image, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          }
        }
      );
    } else {
      if (typeof image === "string")
        throw new Error("Image must be file upload");
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          }
        }
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required"
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1"
            }
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price must be at least 1"
            }
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Discount must be at least 0"
            },
            validate: (value) => {
              const currentRegularPrice = getValues("regular_price");
              if (!currentRegularPrice) return true;
              return (
                Number(value) <= Number(currentRegularPrice) ||
                "Discount must be less than regular price"
              );
            }
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required"
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required"
          })}
        />
      </FormRow>

      <FormRow variant="buttons">
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
