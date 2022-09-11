import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const SoldChartContainer = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          margin={{
            top: 50,
          }}
        >
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="Month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="Count"
            name="Sold"
            label={{ fill: 'white', fontSize: 20 }}
            fill="#3b82f6"
            barSize={75}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default SoldChartContainer;
