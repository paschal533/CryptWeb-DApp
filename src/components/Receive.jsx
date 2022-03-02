import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { BiCopy } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import NoWallect from "./NoWallect";

const Receive = () => {
  const { currentAccount } = useContext(TransactionContext);
  const [copied, setCopied] = useState(false);

  return (
    <div className="md:flex w-full justify-center items-center">
      {currentAccount ?
        <div className="mt-20 ml-12">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${currentAccount}`}
            alt=""
          />
          <div className="md:ml-10 mt-10 md:mt-0">
            <div>
              <h4>Address</h4>
              <input value={currentAccount} />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(currentAccount);
                setCopied(true);
              }}
            >
              {copied ? <FaCheck style={{ color: "#27ad75" }} /> : <BiCopy />}
            </div>
          </div>
        </div>
        : <NoWallect />}
    </div>
  )
} 

export default Receive;
