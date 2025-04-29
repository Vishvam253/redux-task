import { useDispatch } from 'react-redux';
import { addTransaction } from '../store/transactionSlice';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const incomeCategories = ["Salary", "Investment", "Freelance", "Gift", "Bonus"];
const expenseCategories = ["Food", "Travel", "Entertainement", "Bills", "Healthcare", "Other"];

const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({
    amount: '',
    category: '',
    Date: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const validate = () => {
    let valid = true;
    let newError = { amount: '', category: '', date: '' }

    if (formData.amount <= 0 || isNaN(formData.amount)) {
      newError.amount = 'Amount must be greater than 0';
      valid = false;
    }

    if (!formData.category) {
      newError.category = 'Please select a category'
      valid = false;
    }

    if (new Date(formData.date) > new Date()) {
      newError.date = 'Date cannot be in the future'
      valid = false;
    }
    setErrors(newError);
    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch(addTransaction({
      id: Date.now().toString(),
      ...formData
    }));
    toast.success('Transaction added successfully!');
    navigate('/transactions');
  };

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className='max-w h-screen'>
      <div className="max-w-3xl mx-auto mt-5 p-6 bg-gray-100 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Add Transaction</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
              min="0"
              step="1"
            />
            {errors.amount && <p className='text-red-500 text-sm'>{errors.amount}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className='text-red-500 text-sm'>{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Optional"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.Date && <p className='text-red-500 text-sm'>{errors.Date}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all"
          >
            <FaPlus className="mr-2" />
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
