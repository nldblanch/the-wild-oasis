import Skeleton from "../../ui/Skeleton";
import styled from "styled-components";
import { BREAKPOINTS } from "../../utils/constants";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media screen and (max-width: ${BREAKPOINTS.laptop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto 34rem auto;
    gap: 1.6rem;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    gap: 1.2rem;
  }
`;

const StatSkeleton = styled(Skeleton.Card)`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  min-width: 0;

  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    gap: 1.2rem;
  }
`;

const ChartSkeleton = styled(Skeleton.Card)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  grid-column: span 2;

  @media screen and (max-width: ${BREAKPOINTS.largeDesktop}) {
    grid-column: 1 / -1;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    gap: 1.2rem;
  }
`;

const SalesChartSkeleton = styled(Skeleton.Card)`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  @media screen and (max-width: ${BREAKPOINTS.laptop}) {
    grid-column: 1 / -1;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const PieChartSkeleton = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background: var(--color-grey-200);

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    width: 16rem;
    height: 16rem;
  }
`;

function DashboardSkeleton() {
  return (
    <StyledDashboardLayout>
      {[...Array(4)].map((_, i) => (
        <StatSkeleton key={i}>
          <Skeleton.Avatar />
          <div style={{ flex: 1 }}>
            <Skeleton.Box width="60%" height="1.6rem" />
            <Skeleton.Box
              width="40%"
              height="1.2rem"
              style={{ marginTop: "0.8rem" }}
            />
          </div>
        </StatSkeleton>
      ))}

      <ChartSkeleton>
        <Skeleton.Box
          width="30%"
          height="2rem"
          style={{ marginBottom: "1.6rem" }}
        />
        {[1, 2, 3].map((i) => (
          <ActivityItem key={i}>
            <Skeleton.Avatar />
            <div style={{ flex: 1 }}>
              <Skeleton.Box width="80%" height="1.4rem" />
              <Skeleton.Box
                width="60%"
                height="1.2rem"
                style={{ marginTop: "0.4rem" }}
              />
            </div>
            <Skeleton.Button />
          </ActivityItem>
        ))}
      </ChartSkeleton>

      <ChartSkeleton>
        <Skeleton.Box width="35%" height="2rem" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <PieChartSkeleton />
        </div>
      </ChartSkeleton>

      <SalesChartSkeleton>
        <Skeleton.Box width="40%" height="2rem" />
        <Skeleton.Box height="26rem" />
      </SalesChartSkeleton>
    </StyledDashboardLayout>
  );
}

export default DashboardSkeleton;
