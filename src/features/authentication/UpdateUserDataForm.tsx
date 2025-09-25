import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();
  const [avatar, setAvatar] = useState<null | File>(null);

  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState<string>(
    user?.user_metadata?.fullName || ""
  );
  if (!user) return;
  const {
    email,
    user_metadata: { fullName: currentFullName }
  } = user;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    const successHandler = () => {
      setAvatar(null);
      (e.target as HTMLFormElement).reset();
    };
    if (avatar) {
      updateUser(
        { fullName, avatar },
        {
          onSuccess: successHandler
        }
      );
    } else {
      updateUser({ fullName }, { onSuccess: successHandler });
    }
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
