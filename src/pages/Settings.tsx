import { Suspense } from "react";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SettingsFormSkeleton from "../features/settings/SettingsFormSkeleton";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <Suspense fallback={<SettingsFormSkeleton />}>
        <UpdateSettingsForm />
      </Suspense>
    </Row>
  );
}

export default Settings;
