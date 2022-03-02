import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import NoWallect from "./NoWallect";
import FaucetDetails from "./FaucetDetails";

const Faucet = () => {
  const { currentAccount } = useContext(TransactionContext);

  return (
    <div className="md:flex w-full justify-center items-center">
      {currentAccount ?
         <FaucetDetails />
        : <NoWallect />}
    </div>
  )
} 

export default Faucet;
