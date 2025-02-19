import express from "express";
import http from "http";
import { Server } from 'socket.io';
import cors from "cors"
import  serverconfig from "./config/serverconfig"
import roomHandler from "./handler/roomHandler";
const app=express();
const server=http.createServer(app);
app.use(cors())
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});
io.on("connection",(socket)=>{
    console.log("socket connection is on");
    roomHandler(socket); // pass the socket connection to roomHandler
    socket.on("disconnect",()=>{
        console.log("socket connection is off");
        console.log("connection lost");
    })
})
server.listen(serverconfig.PORT,()=>{
    console.log(`Server running on port ${serverconfig.PORT}`);
})
