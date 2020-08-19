const addBtn = document.getElementById("addBtn")

//const myId = document.getElementById("myId").value
const myName = document.getElementById("myName").value
const myImage = document.getElementById("myImage").value
const friendId = document.getElementById("friendId").value
const friendName = document.getElementById("friendName").value
const friendImage = document.getElementById("friendImage").value

addBtn.onclick = (e) => {
    e.preventDefault()
    socket.emit('sendFriendRequest', {
        myId,myName,myImage,friendId,friendName,friendImage
    })
}


socket.on('requestSent', () => {
    addBtn.remove()
    document.getElementById("frmProfile").innerHTML += `<input type="submit" value="Cancel Request" class="btn btn-danger" formaction="/friend/cancel">`
})