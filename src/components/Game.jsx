import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import NoWallect from "./NoWallect";
 
const Game = () => {
  const { cardArray, cardsWon, currentAccount, flipCard, tokenURLs, chooseImage } = useContext(TransactionContext);

  return(
    <div>
      {currentAccount ? <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="justify-center md:mr-50 md:ml-20 mf:mr-20">
              <h1 className="text-3xl md:mr-20 mb-2 d-4">Start matching now!</h1>
              <div className="grid gap-2 m-auto grid-cols-4" >
                {cardArray.map((card, key) => {
                  return(
                    <img
                      key={key}
                      src={chooseImage(key)}
                      data-id={key}
                      onClick={(event) => {
                        let cardId = event.target.getAttribute('data-id')
                        if(!cardsWon.includes(cardId.toString())) {
                          flipCard(cardId)
                        }
                      }}
                    />
                  )
                })}
              </div>
              <div>
                <h5 className="text-3xl mb-2 mt-2 md:mr-20">Tokens Collected:<span id="result">&nbsp;{tokenURLs.length}</span></h5>
                <div className="grid mb-4" >
                  {tokenURLs.map((tokenURI, key) => {
                    return(
                      <img
                        key={key}
                        src={tokenURI}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div> : <NoWallect /> }
    </div>
  )
}

export default Game;
