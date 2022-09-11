import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={390}>
      <BarChart
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="Year" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          dataKey="Count"
          name="Total Accounts"
          label={{ fill: 'white', fontSize: 20 }}
          fill="#3b82f6"
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
