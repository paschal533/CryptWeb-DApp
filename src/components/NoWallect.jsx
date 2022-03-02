import React, { useContext } from "react";
import Image from '../assets/not-found.png';
import { TransactionContext } from "../context/TransactionContext";
import { AiFillPlayCircle } from "react-icons/ai";

const NoWallect = () => {
  const { connectWallet } = useContext(TransactionContext);

  return(
    <div className="flex mt-20">
      <div className="m-auto">
        <img src={Image} alt="img" />
        <button
          type="button"
          onClick={connectWallet}
          className="flex flex-row mt-10 justify-center btn_first ml-20 mf:ml-12 md:ml-44 items-center bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          <AiFillPlayCircle className="text-white mr-2" />
          <p className="text-white text-base font-semibold">
            Connect Wallet
          </p>
        </button>
      </div>
    </div>
  )
}

export default NoWallect;
