import { useMemo } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";

export const useChartConfig = () => {
  const screenSize = useScreenSize();

  return useMemo(() => {
    const configs = {
      mobile: {
        legend: {
          verticalAlign: "bottom" as const,
          align: "center" as const,
          layout: "horizontal" as const,
          iconSize: 12
        },
        pie: {
          innerRadius: 85,
          outerRadius: 110,
          cx: "50%",
          cy: "50%",
          paddingAngle: 3
        },
        fontSize: 10,
        barSize: 20
      },
      tablet: {
        legend: {
          verticalAlign: "middle" as const,
          align: "right" as const,
          layout: "vertical" as const,
          iconSize: 14
        },
        pie: {
          innerRadius: 85,
          outerRadius: 110,
          cx: "50%",
          cy: "50%",
          paddingAngle: 3
        },
        fontSize: 11,
        barSize: 30
      },
      desktop: {
        legend: {
          verticalAlign: "middle" as const,
          align: "right" as const,
          layout: "vertical" as const,
          iconSize: 15
        },
        pie: {
          innerRadius: 85,
          outerRadius: 110,
          cx: "40%",
          cy: "40%",
          paddingAngle: 3
        },
        fontSize: 12,
        barSize: 40
      }
    };
    return configs[screenSize];
  }, [screenSize]);
};
