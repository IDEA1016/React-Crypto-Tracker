import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {
        <ApexChart
          type="line"
          width="580"
          height="300"
          series={[
            {
              name: "sales",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              background: isDark ? "#212F3D" : "#FFFFFF",
            },
            yaxis: {
              tickAmount: 10,
              labels: {
                formatter: (value) => {
                  return value.toFixed(2);
                },
              },
            },
            stroke: {
              curve: "smooth",
            },
            colors: ["#c126d2"],
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            grid: {
              yaxis: {
                lines: { show: false },
              },
            },
          }}
        />
      }
    </div>
  );
}

export default Chart;
