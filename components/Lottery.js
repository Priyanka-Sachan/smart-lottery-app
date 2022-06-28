import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Information, Button, useNotification } from "web3uikit"
import styles from "../styles/Lottery.module.css"

export default function Lottery() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntranceFee] = useState("0")
  const [numberOfPlayers, setNumberOfPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")

  const dispatch = useNotification()

  // Get entrance fee
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getEntranceFee",
    params: {},
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getRecentWinner",
    params: {},
  })

  const { runContractFunction: enterLottery } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
    params: {},
    msgValue: entranceFee,
  })

  async function updateUI() {
    if (lotteryAddress) {
      const entranceFeeFromCall = (await getEntranceFee()).toString()
      const numberOfPlayersFromCall = (await getNumberOfPlayers()).toString()
      const recentWinnerFromCall = (await getRecentWinner()).toString()
      setEntranceFee(entranceFeeFromCall)
      setNumberOfPlayers(numberOfPlayersFromCall)
      setRecentWinner(recentWinnerFromCall)
    }
  }

  // async function clickLottery() {
  //   await enterLottery({ onSuccess: handleSuccess, onError: (error) => console.log(error) });
  // }

  const handleNewNotification = () => {
    dispatch({
      type: "Info",
      message: "Transaction Complete!",
      title: "Entered Lottery",
      position: "topR",
      icon: "bell",
    })
  }

  const handleSuccess = async (tx) => {
    await tx.wait(1)
    handleNewNotification()
    updateUI()
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
    <div>
      <div>
        {lotteryAddress ? (
          <Button
            text="Enter Lottery"
            onClick={async () => {
              await enterLottery({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }}
            theme="secondary"
          />
        ) : (
          <div>Lottery not available for your network.</div>
        )}
      </div>
      <div className={styles.info}>
        <Information information={ethers.utils.formatUnits(entranceFee, "ether")} ETH topic="Entrance Fee (ETH)" />
      </div>
      <div className={styles.info}>
        <Information information={numberOfPlayers} topic="Players" />
      </div>
      <div className={styles.info}>
        <Information information={recentWinner} topic="Recent Winner" />
      </div>
    </div>
  )
}
