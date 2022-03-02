
import { useCallback, useEffect, useState, useContext } from "react";
import web3 from "web3";
import { TransactionContext } from "../context/TransactionContext";

function FaucetDetails() {
  const { currentAccount, isLoading, contract, connectWallet } = useContext(TransactionContext);
  const [balance, setBallance] = useState(null)
  const [shouldReload, reload] = useState(isLoading)

  useEffect(() => {
    const loadBalance = async () => {
      const balance = await web3.eth.getBalance(contract.address)
      setBallance(web3.utils.fromWei(balance, "ether"))
    }

    contract && loadBalance()
  }, [web3Api, shouldReload])

   
  const addFunds = useCallback(async () => {
    await contract.addFunds({
      from: currentAccount,
      value: web3.utils.toWei("1", "ether")
    })

    reloadEffect()
  }, [contract, currentAccount, reloadEffect])

  const withdraw = async () => {
    const withdrawAmount = web3.utils.toWei("0.1", "ether")
    await contract.withdraw(withdrawAmount, {
      from: currentAccount
    })
    reloadEffect()
  }

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          { contract ?
            <div className="is-flex is-align-items-center">
              <span>
                <strong className="mr-2">Account: </strong>
              </span>
                { currentAccount ?
                  <div>{currentAccount}</div> :
                  !contract ?
                  <>
                    <div className="notification is-warning is-size-6 is-rounded">
                      Wallet is not detected!{` `}
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://docs.metamask.io">
                        Install Metamask
                      </a>
                    </div>
                  </> :
                  <button
                    className="button is-small"
                    onClick={() => connectWallet()}
                  >
                    Connect Wallet
                  </button>
                }
            </div> :
            <span>Looking for Web3...</span>
          }
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          <button
            disabled={!currentAccount}
            onClick={addFunds}
            className="button is-link mr-2">
              Donate 1 eth
            </button>
          <button
            disabled={!currentAccount}
            onClick={withdraw}
            className="button is-primary">Withdraw 0.1 eth</button>
        </div>
      </div>
    </>
  );
}

export default FaucetDetails;
