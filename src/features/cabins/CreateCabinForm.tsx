import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";


interface FormFields {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: FileList;
}

function CreateCabinForm() {
  const queryClient = useQueryClient()

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created')

      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      reset()
    },
    onError: (error: Error) => toast.error(error.message)

  })

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate({ ...data, image: data.image[0] })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: 'This field is required'
          })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
          {...register("max_capacity", {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1'
            }
          })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isCreating}
          {...register("regular_price", {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price must be at least 1'
            }
          })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}

          {...register("discount", {
            required: 'This field is required',
            min: {
              value: 0,
              message: 'Discount must be at least 0'
            },
            validate: (value) => {
              const currentRegularPrice = getValues('regular_price');
              if (!currentRegularPrice) return true;
              return Number(value) <= Number(currentRegularPrice) || 'Discount must be less than regular price'
            }

          })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isCreating}

          {...register("description", {
            required: 'This field is required'
          })} />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image")} />
      </FormRow>

      <FormRow variant="buttons" >
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
