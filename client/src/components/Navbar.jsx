import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import logo from "../assets/img/logo.png";
import ethereum from "../assets/img/ethereum.svg";
import bnb from "../assets/img/bnb.svg";
import base from "../assets/img/base.svg";
import arbitrum from "../assets/img/arbitrum.svg";
import { shortenAddress } from "../utlis/shortenAddress";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);

  const {
    currentAccount,
    getBalances,
    getLogout,
    setCurrrentId,
    weiBalance,
    statusNetwork,
    chainId,
    blockUrl,
    switchNetwork,
  } = useContext(TransactionContext);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await weiBalance.toString();
      const symbol = chainId === "0x38" ? "BNB" : "ETH";
      if (balance) {
        document.getElementById("balance_display").textContent =
          0 + balance.slice(1, 4) + " " + symbol;
        document.getElementById("account-balance").textContent =
          balance + " " + symbol;
      }
    };

    fetchBalance();
  }, [weiBalance, chainId]);

  const buttonsData = [
    {
      userId: "0x1",
      className: "network-btn mb-3",
      label: "Ethereum",
      img: ethereum,
      id: 1,
    },
    {
      userId: "0x38",
      className: "network-btn mb-3",
      label: "Binance Smart Chain",
      img: bnb,
      id: 2,
    },
    {
      userId: "0x2105",
      className: "network-btn mb-3",
      label: "Base",
      img: base,
      id: 3,
    },
    {
      userId: "0xA4B1",
      className: "network-btn mb-3",
      label: "Arbitrum One",
      img: arbitrum,
      id: 4,
    },
  ];

  const handleChainChangeClick = async (event) => {
    const userId = event.currentTarget.dataset.userId;
    setCurrrentId(userId);
    await switchNetwork();
    setIsNetworkModalOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentAccount);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleNetworkModal = () => {
    setIsNetworkModalOpen(!isNetworkModalOpen);
  };

  return (
    <nav className="header">
      <div className="">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" className="logo" />{" "}
          <span>PEPE LAYER 2</span>
        </Link>
      </div>
      <ul className="main-nav-list">
        <li>
          <Link to="/" className="main-nav-link active">
            Home
          </Link>
        </li>
        <li>
          <a href="/" className="main-nav-link">
            Roadmap
          </a>
        </li>
        <li>
          <a href="/pepe" className="main-nav-link">
            How to Buy
          </a>
        </li>
      </ul>
      {currentAccount.length > 0 ? (
        <div className="flex gap-4">
          <div
            className="grident-btn rounded-lg w-13 flex items-center"
            onClick={toggleNetworkModal}
          >
            <span className="flex items-center justify-center gap-2">
              {buttonsData.map((data) =>
                chainId === data.userId ? (
                  <img
                    src={data.img}
                    alt={data.label}
                    className="w-6 h-6"
                    key={data.id}
                  />
                ) : null
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="icons w-6 h-6 fill-white"
              >
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </span>
          </div>
          <article
            className="btn-box grident-btn cursor-pointer"
            onClick={toggleModal}
          >
            <p className="pl-4 text-white text-sm" id="balance_display"></p>
            <button className="btn-div">
              <a>
                <img src={logo} alt="" className="w-6 h-6" />
              </a>
              <p>{shortenAddress(currentAccount)}</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icons w-6 h-6 fill-white"
                >
                  <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </span>
            </button>
          </article>
        </div>
      ) : null}

      {isModalOpen && (
        <div className="overlay">
          <section className="section-pop" id="model-menu">
            <div className="pop-menu">
              <div className="pop-header w-full flex justify-end">
                <p id="close" onClick={toggleModal}>
                  <ion-icon
                    name="close-outline"
                    className="pop-icon text-right"
                  ></ion-icon>
                </p>
              </div>
              <ul className="pop-list-menu">
                <li className="">
                  <ul className="pop-list">
                    <li className="flex items-center gap-3 text-white flex-col">
                      <img src={logo} alt="" className="icon-img" />
                      <p className="heading-5">
                        {shortenAddress(currentAccount)}
                      </p>
                      <p className="heading-5" id="account-balance">
                        0 Eth
                      </p>
                    </li>
                    <li className="grid gap-4 grid-cols-2 grid-flow-row">
                      <p
                        className="mt-2 gap-4 mb-4 rounded-lg bg-[#2d2e33] p-4 text-center cursor-pointer"
                        onClick={copyToClipboard}
                      >
                        <ion-icon
                          name="copy-outline"
                          className="w-6 h-6 my-2"
                        ></ion-icon>
                        <br />
                        <span className="para-level-3">Copy Address</span>
                      </p>
                      <p
                        className="mt-2 gap-4 mb-4 rounded-lg bg-[#2d2e33] p-4 text-center cursor-pointer"
                        onClick={getLogout}
                      >
                        <ion-icon
                          name="exit-outline"
                          className="w-6 h-6 my-2"
                        ></ion-icon>
                        <br />
                        <span className="para-level-3">Disconnect</span>
                      </p>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <ul className="pop-list">
                    <li className="w-full text-left">
                      <span className="heading-5">
                        Your Transaction will appear here..
                      </span>
                    </li>
                    <li
                      className="flex items-center justify-between w-full my-2 mb-3"
                      id="coin-status"
                    >
                      <a
                        className="para-level-3 cursor-pointer"
                        href={blockUrl}
                      >
                        View more on explore
                      </a>
                      <span>
                        <ion-icon name="arrow-redo-outline"></ion-icon>
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {isNetworkModalOpen && (
        <div className="overlay-window">
          <section className="section-wallet" id="switch-network">
            <div className="pop-header w-full flex items-center justify-evenly">
              <h5 className="para-level-1 w-full">Switch Network</h5>
              <p onClick={toggleNetworkModal} className="text-right w-full">
                <ion-icon
                  name="close-outline"
                  className="para-level-1"
                ></ion-icon>
              </p>
            </div>
            <article className="mt-32">
              {buttonsData.map((button) => (
                <button
                  id={button.id}
                  key={button.id}
                  data-user-id={button.userId}
                  onClick={handleChainChangeClick}
                  className={button.className}
                >
                  <p className="flex items-center">
                    <img
                      src={button.img}
                      alt={button.label}
                      className="w-6 h-6"
                    />
                    <span className="px-2"> {button.label}</span>
                    <span className="text-green-600">
                      {chainId === button.userId ? "Active" : ""}
                    </span>
                  </p>
                </button>
              ))}
            </article>
          </section>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
