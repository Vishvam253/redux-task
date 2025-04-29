import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { deleteTransaction } from '../store/transactionSlice';
import { selectFilteredTransactions, selectAllFilters } from '../store/filterSlice';
import Filter from './Filter';
import DeleteModal from './DeleteModal';

const TransactionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allTransactions = useSelector((state) => state.transactions.transactions);
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const filters = useSelector(selectAllFilters);

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete =()=>{
    dispatch(deleteTransaction(deleteId));
    setDeleteId(null);
  }

  const handleCancel = ()=>{
    setDeleteId(null);
  }

  const handleEdit = (id) => {
    navigate(`/edit-transaction/${id}`);
  };

 
  const isFilterActive = filters.category || filters.startDate || filters.endDate;

  
  const transactionsToRender = isFilterActive ? filteredTransactions : allTransactions;

  return (
    <div className="mt-6 space-y-4">
      <div className='mb-6'>
      <Filter/>
      </div>
       
       <div className='space-y-4'>
      {transactionsToRender.length === 0 ? (
        <p className="text-center text-gray-400">No transactions found.</p>
      ) : (
        transactionsToRender.map((el) => (
          <div key={el.id} className="bg-white rounded-md shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-all">
            <div>
              <h4 className="text-lg font-bold text-gray-800">{el.description}</h4>
              <p className="text-gray-500 font-semibold text-sm">{el.category} | {new Date(el.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className={`text-lg font-bold ${el.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                ₹{el.amount.toFixed(2)}
              </div>

              <button
                onClick={() => handleEdit(el.id)}
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <FaEdit size={18} />
              </button>

              <button
                onClick={() => handleDelete(el.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        ))
      )}
      </div>

      {deleteId !== null &&(
        <DeleteModal onClose={handleCancel} onConfirm={handleConfirmDelete}/>
      )}
    </div>
  );
};

export default TransactionList;
