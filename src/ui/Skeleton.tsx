import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    var(--color-grey-200) 25%,
    var(--color-grey-300) 50%,
    var(--color-grey-200) 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 3s infinite;
  border-radius: 4px;
  opacity: 50%;
`;

const SkeletonBox = styled(SkeletonBase)<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "1rem"};
`;

const SkeletonInput = styled(SkeletonBase)`
  width: 100%;
  height: 4rem;
  border-radius: var(--border-radius-sm);
`;

const SkeletonLabel = styled(SkeletonBase)`
  width: 20rem;
  height: 1.6rem;
`;

const SkeletonButton = styled(SkeletonBase)`
  height: 3.6rem;
  border-radius: var(--border-radius-sm);
`;

const SkeletonAvatar = styled(SkeletonBase)`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  height: 20rem;
  border-radius: var(--border-radius-md);
`;

const SkeletonFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    max-width: 50rem;
    margin: 0 auto;
  }
`;

const SkeletonForm = styled.div`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
`;

const SkeletonTableRow = styled.div<{ columns?: string }>`
  display: grid;
  grid-template-columns: ${(props: { columns?: string }) =>
    props.columns ?? "1fr"};
  gap: 2.4rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-200);

  &:last-child {
    border-bottom: none;
  }
`;

const SkeletonTable = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const SkeletonStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const SkeletonChart = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  height: 34rem;
`;

const SkeletonCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
`;

function Skeleton({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

Skeleton.Box = SkeletonBox;
Skeleton.Input = SkeletonInput;
Skeleton.Label = SkeletonLabel;
Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Image = SkeletonImage;
Skeleton.FormRow = SkeletonFormRow;
Skeleton.Form = SkeletonForm;
Skeleton.TableRow = SkeletonTableRow;
Skeleton.Table = SkeletonTable;
Skeleton.Stat = SkeletonStat;
Skeleton.Chart = SkeletonChart;
Skeleton.Card = SkeletonCard;

export default Skeleton;
