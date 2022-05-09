import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sweydaverse</title>
      </Head>

      <main id="mint" className={styles.main}>
        <h1>Sweydaverse</h1>
      </main>

      <footer className={styles.footer}>
          <h1>footer</h1>
      </footer>
    </div>
  )
}
