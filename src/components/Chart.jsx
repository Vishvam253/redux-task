import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ExpenseChart = () => {
  const transactions = useSelector(state => state.transactions.transactions);
  const expenses = transactions.filter(t => t.type === 'expense');

  const expenseData = expenses.reduce((acc, curr) => {
      const category = curr.category;
      if (!acc[category]) {
          acc[category] = 0;
      }
      acc[category] += curr.amount;
      return acc;
  }, {});
  
  const chartData = Object.keys(expenseData).map(category => ({
      name: category,
      value: expenseData[category],
  }));
  
  return (
   
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
   
  );
};

export default ExpenseChart

