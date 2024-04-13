import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET", "POST"],
    },
})


io.on("connection",(socket)=>{
    console.log("New User is Connect", socket.id);
    socket.emit('socketId', socket.id);
    socket.on('message',(roomId, msg)=>{
        console.log(msg)
        socket.to(roomId).emit("receivemsg", msg);
    })
});


server.listen(9000,()=>{
    console.log(`server run on Port 9000`);
});
