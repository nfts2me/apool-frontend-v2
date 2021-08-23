import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Select from "react-select";
import { $enum } from "ts-enum-util";
import { formatUnits } from "@ethersproject/units";

import { ChainId } from "@/constants/chains";
import styles from "../styles/Home.module.css";
import Web3ConnectionProvider, {
  useWeb3Connection,
} from "@/utils/web3Connection";
import { useEffect, useState } from "react";
import { ZERO_BN } from "@/constants/util";

const vbAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

const Home: NextPage = () => {
  const {
    readOnlyAppProvider,
    web3Provider,
    isAppConnected,
    isWalletConnected,
    appChainId,
    wallet,
    address,
    disconnectWallet,
    setAppChainId,
    connectWallet,
    pushNetwork,
  } = useWeb3Connection();

  const chainOptions = $enum(ChainId).map((value, key) => ({
    value,
    label: key,
  }));

  const [balance, setBalance] = useState<
    { name: string; balance: string } | undefined
  >();

  useEffect(() => {
    async function getBalance() {
      if (isAppConnected) {
        const res = (await web3Provider?.getBalance(address!)) || ZERO_BN;
        if (isAppConnected) {
          setBalance({
            name: "your balance",
            balance: formatUnits(res || ZERO_BN),
          });
        }
      } else {
        const res = await readOnlyAppProvider?.getBalance(vbAddress);
        if (!isAppConnected) {
          setBalance({ name: "Vitalik balance", balance: formatUnits(res || ZERO_BN) });
        }
      }
    }

    if (!isWalletConnected && !readOnlyAppProvider) {
      setBalance(undefined);
    } else {
      getBalance();
    }
  }, [isAppConnected, isWalletConnected, readOnlyAppProvider, web3Provider, address]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create web3 Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Welcome to Bootnode-web3-Next.js!</h2>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>App Network</h2>
            <Select
              defaultValue={chainOptions[0]}
              onChange={(option) => setAppChainId(option?.value || 1)}
              options={chainOptions}
            />
            isAppConnected: {isAppConnected ? "yes" : "no"}
            <br />
            App chainId: {appChainId}
            {isWalletConnected && !isAppConnected && (
              <button onClick={pushNetwork}>Switch Network</button>
            )}
            <div>
              {balance?.name}: {balance?.balance}
            </div>
          </div>

          <div className={styles.card}>
            <h2>Wallet Connect</h2>
            {isWalletConnected ? (
              <div>
                <div>
                  <button onClick={disconnectWallet}>Disconnect</button>
                </div>
                <div>Connected to: {wallet?.name}</div>
                <div>{address}</div>
              </div>
            ) : (
              <button onClick={connectWallet}>Connect</button>
            )}
          </div>

          {/* <div className={styles.card}>
            <h2>Documentation</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </div> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Web3ConnectionProvider>
      <Home />
    </Web3ConnectionProvider>
  );
}