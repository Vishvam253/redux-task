import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import Dashboard from './components/Dashboard'

import EditTransaction from './components/EditTransaction'
import Home from './pages/Home'



function App() {
  return (

    <BrowserRouter>
      <div className='p-4'>
        <nav className="flex space-x-4 bg-gradient-to-r from-slate-600 to-slate-300 p-4 rounded justify-start ">

          <Link to="/dashboard" className="text-white hover:underline font-semibold text-lg">Dashboard</Link>
          <Link to="/add" className="text-white hover:underline font-semibold text-lg">Add Transaction</Link>
          <Link to="/transactions" className="text-white hover:underline font-semibold text-lg">View Transactions</Link>

        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-transaction/:id" element={<EditTransaction />} />

          <Route path='/add' element={<AddTransaction />} />

          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
