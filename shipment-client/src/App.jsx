import { useState } from 'react'
import './App.css'

function App() {
  const [shipmentString, setShipmentString] = useState('')
  const [status, setStatus] = useState('')

  const handleUpdateShipment = async () => {
    if (!shipmentString.trim()) {
      setStatus('Please enter a shipment string')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: shipmentString
      })

      if (response.ok) {
        setStatus('Shipment updated successfully!')
        setShipmentString('')
      } else {
        setStatus(`Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`)
    }
  }

  return (
    <>
      <h1>Shipment Tracker</h1>
      <div className="shipment-form">
        <input
          type="text"
          value={shipmentString}
          onChange={(e) => setShipmentString(e.target.value)}
          placeholder="Shipment string"
          className="shipment-input"
        />
        <button onClick={handleUpdateShipment} className="update-button">
          Update Shipment
        </button>
      </div>
      {status && <p className="status-message">{status}</p>}
    </>
  )
}

export default App