import Skeleton from "../../ui/Skeleton";

function SettingsFormSkeleton() {
  return (
    <Skeleton.Form>
      <Skeleton.FormRow>
        <Skeleton.Label />
        <Skeleton.Input />
      </Skeleton.FormRow>

      <Skeleton.FormRow>
        <Skeleton.Label />
        <Skeleton.Input />
      </Skeleton.FormRow>

      <Skeleton.FormRow>
        <Skeleton.Label />
        <Skeleton.Input />
      </Skeleton.FormRow>

      <Skeleton.FormRow>
        <Skeleton.Label />
        <Skeleton.Input />
      </Skeleton.FormRow>
    </Skeleton.Form>
  );
}
export default SettingsFormSkeleton;
