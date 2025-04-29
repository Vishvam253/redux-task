
import React from 'react'
import { useSelector } from 'react-redux'
import ExpenseChart from './Chart';

const Dashboard = () => {
    const transactions = useSelector((state)=> state.transactions.transactions);

    const income = transactions
      .filter((ele) => ele.type === 'income')
      .reduce((acc, curr)=> acc + curr.amount, 0);

     const expenses = transactions
      .filter((ele)=> ele.type === 'expense') 
      .reduce((acc, curr)=> acc + curr.amount, 0);

      const balance = income - expenses;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-slate-400 rounded-2xl shadow-md">
       <h1 className="text-2xl font-bold mb-6 text-center text-white">Dashboard</h1>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

       <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-gray-600 text-sm mb-2">Current Balance</h3>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        ₹{balance.toFixed(2)}
        </p>
       </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition mt-2">
        <h3 className="text-gray-600 text-sm mb-2">Total Income</h3>
        <p className="text-2xl font-bold text-green-500">
        ₹{income.toFixed(2)}
        </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition mt-2">
        <h3 className="text-gray-600 text-sm mb-2">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-500">
        ₹{expenses.toFixed(2)}
        </p>
        </div>
        </div>

        <div className='mt-11 bg-gray-200 p-6 rounded-xl transition'>
          <h2 className='text-xl font-semibold mb-4 text-black'>Expense Distribution</h2>
        <ExpenseChart/>
        </div>
    </div>
  )
}

export default Dashboard
