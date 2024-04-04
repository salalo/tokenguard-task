import ReactECharts from 'echarts-for-react';
import { GrowthIndex, Chain, Granularity } from '@/types/types';

type Props = {
  chain1: Chain;
  chain2: Chain;
  chain1Name: string;
  chain2Name: string;
  granularity: Granularity;
};

const granularityToNumber: Record<Granularity, number> = {
  '1 week': 1,
  '2 weeks': 2,
  '3 weeks': 3,
  '4 weeks': 4,
};

export const formatGranularity = (dates: string[], interval: Granularity) => {
  const num = granularityToNumber[interval];
  if (!num) return dates;
  return dates.filter((_, index) => index % num === 0);
};

export const Chart = ({ chain1, chain2, chain1Name, chain2Name, granularity }: Props) => {
  const dateList = chain1.tg_growth_index.map((item) => item.date);

  const options = {
    grid: { left: 100, width: '90%' },
    xAxis: {
      data: formatGranularity(dateList, granularity),
      min: dateList?.[0],
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
    },
    series: [
      {
        name: chain1Name,
        data: chain1.tg_growth_index.map((item: GrowthIndex) => item.value),
        type: 'line',
        smooth: true,

      },
      {
        name: chain2Name,
        data: chain2.tg_growth_index.map((item: GrowthIndex) => item.value),
        type: 'line',
        smooth: true,
      },
    ],
    dataZoom: [
      { startValue: dateList?.[0] },
      { type: 'inside' }
    ],
    tooltip: { trigger: 'axis' },
    legend: { left: 'center' }
  };

  return <ReactECharts option={options} style={{ height: 800 }} />
}