import styled from "styled-components";
import { StaysAfterDateType } from "../../types";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { BREAKPOINTS } from "../../utils/constants";
import { useChartConfig } from "./useChartConfig";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media screen and (max-width: ${BREAKPOINTS.largeDesktop}) {
    grid-column: span 4;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    padding: 3.2rem 1.2rem;
  }
`;

type DurationData = {
  duration: string;
  value: number;
  color: string;
};

const startDataLight: DurationData[] = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444"
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316"
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308"
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16"
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e"
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6"
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6"
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7"
  }
];

const startDataDark: DurationData[] = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c"
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c"
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207"
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f"
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d"
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e"
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8"
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce"
  }
];

function prepareData(
  startData: DurationData[],
  stays: StaysAfterDateType[]
): DurationData[] {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr: DurationData[], field: string): DurationData[] {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr: DurationData[], cur: StaysAfterDateType) => {
      const num = cur.num_of_nights ?? 0;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj: DurationData) => obj.value > 0);

  return data;
}

interface DurationChartProps {
  confirmedStays?: StaysAfterDateType[];
}

function DurationChart({ confirmedStays }: DurationChartProps) {
  const { isDarkMode } = useDarkMode();
  const chartConfig = useChartConfig();

  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays ?? []);
  if (!confirmedStays) return;
  return (
    <ChartBox>
      <Heading as="h2">Stay duration</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            {...chartConfig.pie}
          >
            {startDataLight.map((entry) => (
              <Cell
                key={entry.duration}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend {...chartConfig.legend} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
