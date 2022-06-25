import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Lottery</title>
        <meta name="description" content="Smart Lottery - Decentralized style" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Welcome to lottery!!
    </div>
  )
}
