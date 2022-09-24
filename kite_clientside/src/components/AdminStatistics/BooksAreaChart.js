import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Count"
            name="Sold"
            stroke="#1e3a8a"
            label={{ fill: 'black', fontSize: 15 }}
            fill="#3b82f6"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaChartComponent;
