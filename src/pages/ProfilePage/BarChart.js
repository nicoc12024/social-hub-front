import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({ blogsLikesAndComments }) => {
  const mappedData = blogsLikesAndComments.map((item, index) => {
    return {
      name: `Post ${blogsLikesAndComments.length - index}`,
      likes_count: item.likes_count,
      comments_count: item.comments_count,
    };
  });

  const lines = mappedData.map((item, index) => {
    const color = index % 2 === 0 ? "#2196F3" : "#F44236";
    const dataKey = index === 0 ? "likes_count" : index === 1 ? "comments_count" : null;
    const legendType = index <= 1 ? "star" : "none";

    return (
      <Line
        key={index}
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={2}
        activeDot={{ r: 4 }}
        legendType={legendType}
      />
    );
  });

  return (
    <ResponsiveContainer width="80%" height={300}>
      <LineChart data={mappedData}>
        {lines}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
