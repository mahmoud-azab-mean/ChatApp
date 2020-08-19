const  socket = io()
const btn = document.getElementById("FriendRequestsDropdown")
let myId = document.getElementById('myId').value

socket.on('connect', () => {
    socket.emit('joinNotificationRoom', myId)
    socket.emit("goOnline" , myId)
    //console.log(id)
})

socket.on('newFriendRequest', data => {
    //console.log(data)
    const friendRequests = document.getElementById("friendRequests")
    const span = friendRequests.querySelector(`span`)
    if(span) span.remove()
    
    friendRequests.innerHTML += `
     <a class="dropdown-item" href="/profile/${data.id} ">
     ${data.name}
     </a>`
     
     btn.classList.remove('btn-secondary')
     btn.classList.add('btn-danger')
})

    btn.onclick = () => {
    btn.classList.add('btn-secondary')
    btn.classList.remove('btn-danger')
}   
