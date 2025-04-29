import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useState, useEffect } from 'react';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { updateTransaction } from '../store/transactionSlice';
import { toast } from 'react-hot-toast';


const incomeCategories = ["Salary", "Investment", "Freelance", "Gift", "Bonus"];
const expenseCategories = ["Food", "Travel", "Entertainment", "Bills", "Healthcare", "Other"];

const EditTransaction = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const transaction = useSelector(state =>
        state.transactions.transactions.find(t => t.id === id)
    );

    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: ''
    });

    useEffect(() => {
        if (transaction) {
            setFormData({
                type: transaction.type,
                amount: transaction.amount,
                category: transaction.category,
                description: transaction.description,
                date: transaction.date
            });
        }
    }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.amount <= 0 || isNaN(formData.amount)) {
            alert('Please enter a valid amount greater than 0');
            return;
        }
        if (!formData.category) {
            alert('Please select a category');
            return;
        }

        dispatch(updateTransaction({
            id,
            ...formData
        }));
         toast.success("Transaction updated successfully");
        navigate('/transactions'); 
    };

    if (!transaction) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500 mb-4">Transaction not found!</p>
                <button
                    onClick={() => navigate('/transactions')}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
            <div className="flex items-center gap-2 mb-6">
                <button onClick={() => navigate('/transactions')} className="text-gray-500 hover:text-gray-700">
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-semibold">Edit Transaction</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="Optional"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        <FaSave className="mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTransaction;
