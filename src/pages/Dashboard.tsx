import { Suspense } from "react";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardSkeleton from "../features/dashboard/DashboardSkeleton";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardLayout />
      </Suspense>
    </>
  );
}

export default Dashboard;
