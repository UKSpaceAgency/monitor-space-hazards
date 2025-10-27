import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

type GabbardData = {
  period: number;
  apogee: number;
  perigee: number;
  name?: string;
};
type GabbardChartProps = {
  data: GabbardData[];
  satelliteData: GabbardData[];
};

const GabbardChart = ({ data, satelliteData }: GabbardChartProps) => {
  const datasets = {
    datasets: [
      {
        label: 'Fragment Apogee',
        data: data.map(point => ({ x: point.period, y: point.apogee })),
        backgroundColor: chartPalette.nspocBlue,
        borderColor: chartPalette.nspocBlue,
        showLine: false,
        pointRadius: 1.5,
      },
      {
        label: 'Fragment Perigee',
        data: data.map(point => ({ x: point.period, y: point.perigee })),
        backgroundColor: chartPalette.nspocRed,
        borderColor: chartPalette.nspocRed,
        showLine: false,
        pointRadius: 1.5,
      },
      {
        label: 'Satellite Apogee',
        data: satelliteData.map(point => ({ x: point.period, y: point.apogee })),
        backgroundColor: chartPalette.nspocYellow,
        borderColor: chartPalette.nspocYellow,
        showLine: false,
        pointRadius: 7,
        hoverRadius: 9,
        pointStyle: 'cross',
      },
      {
        label: 'Satellite Perigee',
        data: satelliteData.map(point => ({ x: point.period, y: point.perigee })),
        backgroundColor: chartPalette.nspocGreen,
        borderColor: chartPalette.nspocGreen,
        showLine: false,
        pointRadius: 7,
        hoverRadius: 9,
        pointStyle: 'cross',
      },
    ],
  };
  return <BaseChart data={datasets} name="gabbard-chart" xAxisTitle="Period (minutes)" yAxisTitle="Altitude (km)" />;
};

export { GabbardChart };
