import React from 'react'
import { useDispatch } from 'react-redux'
import { setCategory, setStartDate, setEndDate, clearFilters } from '../store/filterSlice'

const categories = ['Food', 'Travel', 'Bills', 'Entertainment', 'HealthCare', 'Other',"Salary", "Investment", "Freelance", "Gift", "Bonus"];

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className='mt-5'>
      <h2 className='text-2xl font-bold mb-4 text-gray-700'>Filter Transactions</h2>
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 p-4 bg-white shadow
    rounded-lg space-y-4 md:space-y-0 md:space-x-4">
     
      <select
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="border p-2 rounded w-full md:w-auto"
      >   
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        onChange={(e) => dispatch(setStartDate(e.target.value))}
        className="border p-2 rounded w-full md:w-auto"
      />
     
      <input
        type="date"
        onChange={(e) => dispatch(setEndDate(e.target.value))}
        className="border p-2 rounded w-full md:w-auto"
      />

      <button
        onClick={() => dispatch(clearFilters())}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear
      </button>

    </div>
    </div>
  )
}

export default Filter
