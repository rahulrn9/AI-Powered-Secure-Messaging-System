// WebRTC stub
const pc = new RTCPeerConnection();
pc.onicecandidate = e => { if (e.candidate) console.log('ICE:', e.candidate); };
