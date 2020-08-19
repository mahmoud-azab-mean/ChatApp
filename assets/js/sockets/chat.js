const chatId = document.getElementById("chatId").value
const msg = document.getElementById("message")
const sendBtn = document.getElementById("sendBtn")
const msgContainer = document.getElementById("messagesContainer")
const callBtn = document.getElementById("callBtn")

msgContainer.scrollTop = msgContainer.scrollHeight

socket.emit("joinChat", chatId )
sendBtn.onclick = () => {
    let content = msg.value
    socket.emit("sendMessage", {
        chat: chatId,
        content: content,
        sender: myId,
    }, () => {
        msg.value =""
        msgContainer.scrollTo = msgContainer.scrollHeight
    })
}


socket.on("newMessage", msg => {
    msgContainer.innerHTML += `
    <span class="msg ${msg.sender === myId ? "left" : "right"}">
        ${msg.content}
    </span>
    
    `
    msgContainer.scrollTo = msgContainer.scrollHeight
})

let peer = new Peer()
let peerId = null
peer.on("open", id => {
    console.log("myId" + id)
    peerId = id
} )

callBtn.onclick = () => {
    socket.emit("requestPeerId", chatId )
}

socket.on("getPeerId", () => {
    socket.emit("sendPeerId", {
        chatId: chatId,
        peerId: peerId,
    })
})
socket.on("recivePeerId", id => {
    console.log(id)
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(stream => {
        let call = peer.call(id, stream)
        call.on("stream", showViedoCall )

    }).catch(err => console.log(err))

})

peer.on("call", call => {
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(stream => {
        call.answer(stream)
        call.on("stream", showViedoCall )
    }).catch(err => console.log(err))
})

function showViedoCall(stream){
    let video = document.createElement("viedo")
    video.srcObject = stream
    document.body.append(video)
    video.paly()
}