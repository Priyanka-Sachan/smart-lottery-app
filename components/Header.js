import { Illustration, ConnectButton } from "web3uikit"

export default function Header() {
  return (
    <div>
      <h1>Smart Lottery</h1>
      <h3>Try decentralized & verifiable luck..</h3>
      <ConnectButton moralisAuth={false} />
      <Illustration logo="chest" />
    </div>
  )
}