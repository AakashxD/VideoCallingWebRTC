import express from "express";
import http from "http";
import { Server } from 'socket.io';
import cors from "cors"
import  serverconfig from "./config/serverconfig"
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
    socket.on("disconnect",()=>{
        console.log("socket connection is off");
        console.log("connection lost");
    })
})

server.listen(serverconfig.PORT,()=>{
    console.log(`Server running on port ${serverconfig.PORT}`);
})
