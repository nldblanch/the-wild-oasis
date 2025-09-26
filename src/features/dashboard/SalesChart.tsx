import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { BookingsAfterDateType } from "../../types";
import {
  eachDayOfInterval,
  format,
  formatDate,
  isSameDay,
  subDays
} from "date-fns";
import { useState } from "react";
import Button from "../../ui/Button";
import { BREAKPOINTS } from "../../utils/constants";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
    gap: 1.2rem;
  }
`;

interface SalesChartProps {
  bookings?: BookingsAfterDateType[];
  numDays: number;
}

function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode();
  const [showCombined, setShowCombined] = useState(false);
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        combinedSales: { stroke: "#fc3c3c" },
        text: "#e5e7eb",
        background: "#18212f"
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        combinedSales: { stroke: "#fc3c3c" },
        text: "#374151",
        background: "#fff"
      };
  if (!bookings) return;

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  });

  const data = allDates.map((date) => {
    const bookingsForDate = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at))
    );

    const { totalSales, extrasSales, combinedSales } = bookingsForDate.reduce(
      (acc, { total_price = 0, extras_price = 0 }) => {
        const total = typeof total_price === "number" ? total_price : 0;
        const extras = typeof extras_price === "number" ? extras_price : 0;
        acc.totalSales += total;
        acc.extrasSales += extras;
        acc.combinedSales += total + extras;
        return acc;
      },
      { totalSales: 0, extrasSales: 0, combinedSales: 0 }
    );

    return {
      label: formatDate(date, "MMM dd"),
      totalSales,
      extrasSales,
      combinedSales
    };
  });
  return (
    <StyledSalesChart>
      <StyledHeaderContainer>
        <Heading as="h2">
          Sales from {format(allDates.at(0) ?? 0, "MMM dd yyyy")} &mdash;{" "}
          {format(allDates.at(-1) ?? 0, "MMM dd yyyy")}
        </Heading>
        <Button onClick={() => setShowCombined((show) => !show)}>
          {showCombined ? "Hide" : "Show"} combined sales
        </Button>
      </StyledHeaderContainer>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />

          {showCombined && (
            <Area
              type="monotone"
              dataKey="combinedSales"
              stroke={colors.combinedSales.stroke}
              fill="none"
              strokeWidth={2}
              name="Combined sales"
              unit="$"
              dot={false}
              activeDot={{ r: 6 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
