import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './assets/app.css';

const socket = io("http://localhost:9000");
function App() {

  const [message, setMessage] = useState('');
  const [roomId, setroomId] = useState('');
  const [socketId, setSocketId] = useState('');
  const [receiveMSG, setReceiveMSG] = useState<string[]>([]);
  const [group, setGroup] = useState('')

  console.log(receiveMSG);

  function sendMessage(e: any) {
    e.preventDefault()
    socket.emit('message', roomId, message);
    setMessage('');
  }

  function joinGroup(e:any){
    e.preventDefault()
    socket.emit('join-room', group);
    setGroup('');
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    })
    socket.on('socketId', (id) => {
      setSocketId(id)
    })

    socket.on("receivemsg", (msg:any) => {
      setReceiveMSG([...receiveMSG, msg]);
    })
  })

  return (
    <>
      <div className="outChart">
        <div className="chart">
          <h2>This is the power of Socket-io <h1>{socketId}</h1></h2>
          <h3>Welcome Introduce with WebSocket Concept</h3>
          <div className="join-room-div">
            <input onChange={(e)=>setGroup(e.target.value)} type="text" placeholder='Group Name' value={group}/>
            <button onClick={joinGroup}>Join</button>
          </div>
          <input onChange={(e) => setroomId(e.target.value)} type="text" placeholder='Enter Room ID' />
          <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Chart with Friend' autoComplete='off' required value={message}/>
          <button onClick={sendMessage}>Send</button>

        </div>
        <div className="msg">
          <h1>Chat...</h1>
          <div>{receiveMSG.map((value)=><p id='msg'>{value}</p>)}</div>
        </div>
      </div>
    </>
  )
}

export default App
