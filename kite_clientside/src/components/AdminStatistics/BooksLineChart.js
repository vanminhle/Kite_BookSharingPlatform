import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  LineChart,
} from 'recharts';

const BooksLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={200}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Month" name="Month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Count"
          name="Books"
          stroke="#8884d8"
          label={{ fill: 'black', fontSize: 15 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BooksLineChart;
