
const myPeerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: `stun.l.google.com:19302` },
    {
      url: 'turn:relay.backups.cz',
      credential: 'webrtc',
      username: 'webrtc'
  }
  ]
});




const dc = myPeerConnection.createDataChannel("chat", {negotiated: true, id: 0});
const log = (msg) => message.innerHTML += `<br> ${msg}`;
dc.onmessage = e => log(` ${e.data}`);
myPeerConnection.oniceconnectionstatechange = () =>  spanConnection.innerHTML = myPeerConnection.iceConnectionState;

function send() {
  dc.send(`User 2: ${chat.value}`);
  log(`Me: ${chat.value}`);
  chat.value = "";
};

async function createOffer() {
  await myPeerConnection.setLocalDescription(await myPeerConnection.createOffer());
  myPeerConnection.onicecandidate = () => {
    offer.value = myPeerConnection.localDescription.sdp;
    offer.select();
  };
}


function createAnswer() {
  myPeerConnection.onicecandidate = () => {
    answer.focus();
    answer.value = myPeerConnection.localDescription.sdp;
    answer.select();
  };
  myPeerConnection.setRemoteDescription({type: "answer", sdp: answer.value});

};
