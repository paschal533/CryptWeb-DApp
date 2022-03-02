
import { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

function FaucetDetails() {
  const { currentAccount, addFunds, withdraw, balance } = useContext(TransactionContext);
  const [value, setValue] = useState('');
  console.log(balance)

  return (
    <div className="flex mt-20">
      <div className="m-auto ml-2">
        <div className="md:flex">
          <span>
            <strong className="mr-2">Account: </strong>
          </span>
          <div>{currentAccount}</div> 
        </div>
      <div className="balance-view is-size-2 my-4">
        Current Balance: <strong>{balance}</strong> ETH
      </div>
      <input className="p-4 text-black amount-input" onChange={(e) => setValue(e.target.value)} placeholder="how much eth do you want to donate"/>
      <button
        disabled={!currentAccount && value.length === "0"}
        onClick={() => addFunds(value)}
        className="flex flex-row text-white justify-center items-center my-5 bg-green-500 p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]">
          Donate eth
      </button>
      <button
        disabled={!currentAccount}
        onClick={withdraw}
        className="flex flex-row text-white justify-center items-center my-5 bg-indigo-500 p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]">
          Withdraw 0.1 eth
      </button>
    </div>
    </div>
  );

}
export default FaucetDetails;
