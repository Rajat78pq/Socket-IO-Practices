import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './assets/app.css';

const socket = io("http://localhost:9000");
function App() {

  const [message, setMessage] = useState('');
  const [roomId, setroomId] = useState('');
  const [socketId, setSocketId] = useState('');
  const [receiveMSG, setReceiveMSG] = useState('');

  function sendMessage(e: any) {
    e.preventDefault()
    socket.emit('message', roomId, message, socketId);
    setMessage('')
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    })
    socket.on('socketId', (id) => {
      setSocketId(id)
    })

    socket.on("receivemsg", (e) => {
      setReceiveMSG(`From ${e.socketId} : ${e.msg}`);
    })
  })

  return (
    <>
      <div className="outChart">
        <div className="chart">
          <h2>This is the power of Socket-io <h1>{socketId}</h1></h2>
          <h3>Welcome Introduce with WebSocket Concept</h3>
          <input onChange={(e) => setroomId(e.target.value)} type="text" placeholder='Enter Room ID' />
          <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Chart with Friend' />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="msg">
          <h2>Chart</h2>
          <p>{receiveMSG}</p>
        </div>
      </div>
    </>
  )
}

export default App
