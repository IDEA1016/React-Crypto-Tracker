import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

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

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const ohlcvData = data?.map((data) => ({
    x: data.time_open,
    y: [data.open, data.high, data.low, data.close],
  }));

  return (
    <div>
      <ApexChart
        type="candlestick"
        width="580"
        height="300"
        series={[{ data: ohlcvData }] as unknown as number[]}
        options={{}}
      />
    </div>
  );
}
export default Price;
