import { Illustration, ConnectButton } from "web3uikit"
import styles from "../styles/Header.module.css"

export default function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.title}>Smart Lottery</p>
      <p className={styles.subtitle}>Try decentralized & verifiable luck..</p>
      <ConnectButton className={styles.connectButton} moralisAuth={false} />
      <Illustration className={styles.chest} logo="chest" />
    </div>
  )
}