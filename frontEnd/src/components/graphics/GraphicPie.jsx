import { DonutChart, Legend } from '@tremor/react';

const logros = [
  {
    name: 'LA',
    value: 4,
  },
  {
    name: 'LP',
    value: 2,
  },
  {
    name: 'LN',
    value: 1,
  }
];

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function DonutChartUsageExample() {
  return (
    <>
      <div className="h-full flex items-center justify-center space-x-3">
        <DonutChart
          data={logros}
          category="value"
          index="name"
          colors={['green', 'yellow', 'red']}
          className="w-20 h-20 z-50"
        />
        <Legend
          categories={['Alcanzado', 'En proceso', 'No alcanzado']}
          colors={['green', 'yellow', 'red']}
          className="max-w-36 z-10"
        />
      </div>
    </>
  );
}