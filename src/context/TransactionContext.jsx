import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import Web3 from 'web3';
import BlankImage from "../assets/images/blank.png";
import WhiteImage from "../assets/images/white.png";
import Cheese from "../assets/images/cheeseburger.png";
import fries from "../assets/images/fries.png";
import hotdog from "../assets/images/hotdog.png";
import iceIcream from "../assets/images/ice-cream.png";
import milkshake from "../assets/images/milkshake.png";
import pizza from "../assets/images/pizza.png";

import { contractABI, contractAddress, MintNFTAddress, MintcontractABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const CARD_ARRAY = [
  {
    name: 'fries',
    img: fries
  },
  {
    name: 'cheeseburger',
    img:  Cheese
  },
  {
    name: 'ice-cream',
    img: iceIcream
  },
  {
    name: 'pizza',
    img: pizza
  },
  {
    name: 'milkshake',
    img:  milkshake
  },
  {
    name: 'hotdog',
    img:  hotdog
  },
  {
    name: 'fries',
    img:  fries
  },
  {
    name: 'cheeseburger',
    img:  Cheese
  },
  {
    name: 'ice-cream',
    img:  iceIcream
  },
  {
    name: 'pizza',
    img:  pizza
  },
  {
    name: 'milkshake',
    img:  milkshake
  },
  {
    name: 'hotdog',
    img:  hotdog
  }
]

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState('0');
  const [token, setToken] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenURLs, setTokenURLs] = useState([]);
  const [cardArray, setCardArray] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  useEffect(() => {
    loadBlockchainData();
    setCardArray(CARD_ARRAY.sort(() => 0.5 - Math.random()));
  })

 const loadBlockchainData = async () => {
    try {
      const web3 = window.web3
      const token = new web3.eth.Contract(MintcontractABI, MintNFTAddress)
      setToken(token)
      const totalSupply = await token.methods.totalSupply().call()
      setTotalSupply(totalSupply)
      // Load Tokens
      let balanceOf = await token.methods.balanceOf(currentAccount).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(currentAccount, i).call()
        let tokenURI = await token.methods.tokenURI(id).call()
        setTokenURLs((prevState) => ([
           ...prevState, tokenURI
        ]))
      }
    }catch(error) {
      console.log(error)
    }
  }

  const chooseImage = (cardId) => {
    cardId = cardId.toString()
    if(cardsWon.includes(cardId)) {
      return WhiteImage
    }
    else if(cardsChosenId.includes(cardId)) {
      return CARD_ARRAY[cardId].img
    } else {
      return BlankImage
    }
  }

  const flipCard = async (cardId) => {
    let alreadyChosen = cardsChosen.length;
    let card = cardArray[cardId].name;
    setCardsChosen((prevState) => ([...prevState, card]));
    setCardsChosenId((prevState) => ([...prevState, cardId]));

    if (alreadyChosen === 1) {
      setTimeout(checkForMatch(), 100)
    }
  }

  const checkForMatch = async () => {
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if(optionOneId == optionTwoId) {
      alert('You have clicked the same image!')
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      token.methods.mint(
        window.location.origin + CARD_ARRAY[optionOneId].img.toString()
      )
      .send({ from: currentAccount })
      .on('transactionHash', (hash) => {
        setCardsWon((prevState) => ([...prevState, optionOneId, optionTwoId]));
        setTokenURLs((prevState) => ([...prevState, CARD_ARRAY[optionOneId].img]))
      })
    } else {
      alert('Sorry, try again')
    }
    setCardsChosen([]);
    setCardsChosenId([]);
    if (cardsWon.length === CARD_ARRAY.length) {
      alert('Congratulations! You found them all!')
    }
  }

  useEffect(() => {
    const loadBalance = async () => {
      const transactionsContract = createEthereumContract();
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(transactionsContract);
      console.log(transactionsContract)
      console.log(balance)
      setBalance(balance)
    }
   loadBalance()
  }, [])

  /*const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };*/

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };*/

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      if (ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    const getContract = async () => {
      try{
        if(ethereum){
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(transactionsContract)
        }
      }catch(error){
        console.log(error);
      }
    }

    getContract()
  }, []);
   

  const addFunds = useCallback(async (value) => {
    const transactionsContract = createEthereumContract();
    const parsedAmount = ethers.utils.parseEther(value);
    await transactionsContract.addFunds({
      from: currentAccount,
      value: parsedAmount
    })

  }, [contract, currentAccount])

  const withdraw = async () => {
    const transactionsContract = createEthereumContract();
    const parsedAmount = ethers.utils.parseEther("0.1");
    await transactionsContract.withdraw(parsedAmount, {
      from: currentAccount
    })
  }

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        setIsLoading(true);

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message);

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    //checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        addFunds,
        withdraw,
        formData,
        balance,
        cardArray, 
        cardsWon, 
        flipCard, 
        tokenURLs,
        chooseImage
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
