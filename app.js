const express=require("express");
const socket=require("socket.io");



const app=express();

app.use(express.static("public"));

let port=process.env.PORT || 3000;
let server=app.listen(port,()=>{
    console.log("The server has started in port"+port);
})

let io= socket(server);
io.on("connection",(socket)=>{
    console.log("made socket connection");
    //received data
    socket.on("beginpath",(data)=>{
        //transfer data to all connected computers
        io.sockets.emit("beginpath",data);
    })
    socket.on("drawstroke",(data)=>{
        //transfer data to all connected computers
        io.sockets.emit("drawstroke",data);
    })
})