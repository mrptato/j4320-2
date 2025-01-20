import { useEffect, useState } from "react";
import { Transaction, fetchTransactions } from "./api/mockTransactions"

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")


  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data)
        setFilteredTransactions(data)
        setError(null)
      })
      .catch((error) => {
        setError(error)
      })
  }, [])

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredTransactions(transactions);
      return
    }

    const filtered = transactions.filter(txn => {
      return new Date(txn.date) > new Date(startDate) && new Date(txn.date) < new Date(endDate)
    })

    setTransactions(filtered)

  }

  return (
    <div>
      <h1>Payment Transaction</h1>
      {error && <p>Error: {error}</p>}
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>
      <table border={1} width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ?
            transactions.map(txn => (
              <tr key={txn.transactionID}>
                <td>{txn.transactionID}</td>
                <td>{txn.date}</td>
                <td>{txn.description}</td>
                <td>${txn.amount.toFixed(2)}</td>
              </tr>
            ))
            :
            <>No transactions</>
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
