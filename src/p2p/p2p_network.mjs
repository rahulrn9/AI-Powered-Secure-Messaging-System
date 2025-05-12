@"
import { createLibp2p } from 'libp2p'
import { tcp }            from '@libp2p/tcp'
import { noise }          from '@libp2p/noise'
import { yamux }          from '@libp2p/yamux'
import { fileURLToPath }  from 'url'

async function startP2PNode() {
  const node = await createLibp2p({
    addresses: { listen: ['/ip4/127.0.0.1/tcp/0'] },
    transports: [tcp()],
    connectionEncryption: [noise()],
    streamMuxers: [yamux()],
  })
  await node.start()
  console.log('📡 P2P node started on:')
  for (const addr of node.getMultiaddrs()) {
    console.log(`  - ${addr.toString()}`)
  }
}

const __filename = fileURLToPath(import.meta.url)
if (process.argv[1] === __filename) {
  startP2PNode().catch(err => console.error(err))
}
"@ | Set-Content src\p2p\p2p_network.mjs
