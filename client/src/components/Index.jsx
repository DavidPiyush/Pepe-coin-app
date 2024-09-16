import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../image/logo.png";
import about from "../image/about.jpg";
import form from "../image/form.png";
import refer from "../image/refer.png";
import tokenomes from "../image/tokenomes.png";
import graph from "../image/graph.png";
import home from "../image/home.gif";
import moneyFrog from "../image/moneyFrog.png";
import contact from "../image/contact.png";

import oneb from "../image/bubble/one.png";
import twob from "../image/bubble/two.png";
import threeb from "../image/bubble/three.png";
import fourb from "../image/bubble/four.png";
import fiveb from "../image/bubble/five.png";
// import sixb from "../image/bubble/six.png";

import oneR from "../image/roadmap/one.png";
import twoR from "../image/roadmap/two.png";
import threeR from "../image/roadmap/three.png";
import fourR from "../image/roadmap/four.png";
// import fiveR from "../image/roadmap/five.png";
import sixR from "../image/roadmap/six.png";

import bitcoinst from "../image/Feature-img/bitcoinst.svg";
import cointelegraph from "../image/Feature-img/cointelegraph.svg";
import cryptonews from "../image/Feature-img/cryptonews.svg";
import techopedia from "../image/Feature-img/techopedia.svg";

const Index = () => {
  useEffect(() => {
    const sectionHeroEl = document.querySelector(".section-hero"); // The element to observe
    const obs = new IntersectionObserver(
      function (entity) {
        const ent = entity[0];

        if (!ent.isIntersecting) {
          document.body.classList.add("sticky");
        } else {
          document.body.classList.remove("sticky");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );

    if (sectionHeroEl) {
      obs.observe(sectionHeroEl);
    }

    return () => {
      if (sectionHeroEl) {
        obs.unobserve(sectionHeroEl);
      }
    };
  }, []);

  return (
    <div>
      <header className="header">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" className="logo" />{" "}
          <span>PEPE LAYER 2</span>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <a href="#TOKENOMICS" className="main-nav-link active-link">
                TOKENOMICS{" "}
              </a>
            </li>
            <li>
              <a href="#Roadmap" className="main-nav-link">
                Roadmap
              </a>
            </li>
            {/* <li><a href="#" class="main-nav-link">How to Buy</a></li> */}
            <li>
              <Link to="/refers" className="main-nav-link nav-cta">
                Join AirDrop
              </Link>
            </li>
            <li>
              <Link
              to="/pepe" className="main-nav-link nav-cta">
                Buy Now
              </Link>
              {/* <a href="#" className="main-nav-link nav-cta"></a> */}
            </li>
          </ul>
        </nav>
      </header>
      {/* /////////////////////////////////////////////////////////// */}
      <section className="section-hero ">
        <img src={home} alt className="video" />

        <div className="container grid grid-2-cols gap">
          <div className="hero-heading-field">
            <h1 className="heading-primary mt-96">PEPE LAYER 2</h1>
            <p className="para-level-2 mt-32">
              Pepe Layer2 Memecoin is a cryptocurrency inspired by the popular
              internet meme character Pepe the Frog . Created as a parody and a
              nod to meme culture,Pepe Memecoin blends the playful,irreveret
              spirit of online memes with the serious world of digital
              currencies.
            </p>
            <div className="social-btn mt-32">
              <a href>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={54}
                  height={54}
                  fill="currentColor"
                  className="bi bi-twitter-x icons"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
              <a href>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={54}
                  height={54}
                  fill="currentColor"
                  className="bi bi-telegram icons ml-48"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ///////////////////////////////////////////////////////////////// */}
      <section className="section-features ">
        <div className="container grid grid-2-cols">
          <div className="feature-box">
            <h2 className="secondary-heading mt-64">Pepe Layer Token</h2>
            <div className="coming-soon-container">
              <div className="coming-soon-box">
                <h3>Coming Soon</h3>
              </div>
            </div>
            <p className="shape mt-32 para-level-2">
              {" "}
              <span className="blink">Stay tuned for something amazing!</span>
            </p>
          </div>

          <div className="feature-box">
            <img src={moneyFrog} alt className="coin-pepe" />
          </div>
        </div>
      </section>
      {/* ////////////////////////////////////////////////////////////////// */}
      <section className="section-contract ">
        <div className="container grid grid-2-cols gap mt-96">
          <div className="contract-img">
            <img src={about} alt />
          </div>
          <div>
            <article className="contract">
              <h2 className="secondary-heading mt-64 neon-heading">
                about $pepe
              </h2>
              <p className="para-level-2 mb-24">
                Introducing $PEPE: The ultimate meme coin with a colossal supply
                of 100 billion tokens. Our token features 65% liquidity locked
                for one year for unmatched stability and a 5% transaction tax to
                fuel continuous growth. Dive into the $PEPE experience and ride
                the wave of innovation in the crypto world!
              </p>
              <div className="mt-32">
                <Link to="/refer">
                  <button className="button-50">Join AirDrop</button>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* //////////////////////////Tokenomics////////////////////////// */}
      <section>
        <div className="tokenomics-container mt-64" id="TOKENOMICS">
          <h2 className="title-tokenomics">TOKENOMICS</h2>
          <div className="neon-animation">
            <div className="neon-text">COMING SOON</div>
          </div>
          <div className="loading-animation">
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
          </div>
        </div>
      </section>
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Roadnap */}
      <section className="roadmaps">
        <div className="container">
          <h2 className="roadmap-title neon-glow ">Roadmap</h2>
          <div className="timeline-section">
            <div className="timeline">
              <article className="timeline-item">
                <img src={oneR} alt className="timeline-icon-left" />
                <div className="timeline-content">
                  <h3 className="timeline-date">
                    <span>Phase 1</span>
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span> Building team
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Website launch
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Airdrop launch
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Huge marketing campaign
                  </h3>
                  {/* <p class="timeline-description">Start by installing the MetaMask browser extension or mobile
                          app. Create a new wallet or import your existing one.
                          Ensure you're connected to the Ethereum network or the network your project supports.
                      </p> */}
                </div>
              </article>
              <article className="timeline-item">
                <img src={twoR} alt className="timeline-icon-right " />
                <div className="timeline-content">
                  <h3 className="timeline-date">
                    <span>Phase 2</span>
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span> Token Generation Event (TGE)
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Airdrop distribution 50% at TGE 50% after CEX listing
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Pre-sale launch
                  </h3>
                  {/* <p class="timeline-description">Once your MetaMask wallet is set up, navigate to a
                          decentralized exchange (DEX) like Uniswap or PancakeSwap. Swap
                          Ethereum (ETH) or Binance Coin (BNB) for Pepe Coin (PEPE). Follow the instructions on
                          the exchange to complete the
                          transaction.</p> */}
                </div>
              </article>
              <article className="timeline-item">
                <img src={threeR} alt className="timeline-icon-left" />
                <div className="timeline-content">
                  <h3 className="timeline-date">
                    <span>Phase 3</span>
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span> Marketing and infulancers campaign
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Pre-sale distribution claim
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    List On DEXes
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    CMC &amp; CoinGecko
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Vested Airdrop distribution 50%
                  </h3>
                </div>
              </article>
              <article className="timeline-item">
                <img src={fourR} alt className="timeline-icon-right" />
                <div className="timeline-content">
                  <h3 className="timeline-date">
                    <span>Phase 4</span>
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span> CEX Listings
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Our PLayerTAP Launch Game
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Bonus Campaign for Loyal Holders
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    NFT collection Launch
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Focus on partnership.
                  </h3>
                  {/* <p class="timeline-description">Engage with our daily challenges to earn rewards and learn
                          more about Pepe Layer2. Each challenge will test your
                          knowledge and participation, offering Pepe Coin as a reward for completion.</p> */}
                </div>
              </article>
              <article className="timeline-item">
                <img src={sixR} alt className="timeline-icon-left" />
                <div className="timeline-content">
                  <h3 className="timeline-date">
                    <span>Phase 5</span>
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span> Tier-1 CEX Listing
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Airdrop for game users .
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Marketing campaign
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    Infulancers Campaign
                  </h3>
                  <h3 className="timeline-date">
                    <span>•</span>
                    New merchandising collection
                  </h3>
                  {/* <p class="timeline-description">Maximize your earnings by staking your Pepe Coins in our
                          staking platform. Choose from various staking options and earn
                          additional rewards based on your staking duration and amount.</p> */}
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Bubbles Section */}
        <div className="bubbles">
          <div className="bubble bubble1">
            <img src={oneb} alt className="bubble-size " />
          </div>
          <div className="bubble bubble2">
            <img src={threeb} alt className="bubble-size " />
          </div>
          <div className="bubble bubble3">
            <img src={fourb} alt className="bubble-size " />
          </div>
          <div className="bubble bubble4">
            <img src={fiveb} alt className="bubble-size " />
          </div>
          <div className="bubble bubble5">
            <img src={twob} alt className="bubble-size " />
          </div>
        </div>
      </section>
      {/* ///////////////////////////////////////////////////////////////// */}
      <section className="section-how">
        <article className="t-center">
          <h2 className="secondary-heading mb-24 neon-heading how-header">
            How to Join AirDrop
          </h2>
        </article>
        <div className="section-how-box mt-64 ">
          <div className="grid grid-2-cols gap">
            <article className="article-box">
              <h3 className="heading-h3 mb-24">STEP 1</h3>
              <span className="para-level-3">Set Up Your Wallet</span>
              <p className="para-level-1 mt-12">
                Install MetaMask on your browser or use a Wallet
                Connect-supported wallet like Trust Wallet. Create a new wallet
                and securely store your recovery phrase.
              </p>
            </article>
            <article className="article-box js-end">
              <h3 className="heading-h3 mb-24">STEP 2</h3>
              <span className="para-level-3">Connect Your Wallet</span>
              <p className="para-level-1 mt-12">
                Visit our Pepe Layer2 AirDrop page and click "Connect Wallet."
                Select your wallet and authorize the connection. Ensure your
                wallet is set to the correct blockchain network.
              </p>
            </article>
          </div>

          <div className=" grid grid-2-cols gap mt-64">
            <article className="article-box ">
              <article>
                <h3 className="heading-h3 mb-24">STEP 3</h3>
                <span className="para-level-3">
                  Visit the AirDrop Page and Complete Tasks
                </span>
                <p className="para-level-1 mt-12">
                  Visit the AirDrop page and complete the required tasks. This
                  may include activities like sharing on social media, joining
                  our communities, or other promotional actions.
                </p>
              </article>

              <div className="option-to-buy">
                <article className="drop-down">
                  <p className="border-radius-24">
                    <button
                      className="btn btn-show border-radius-24"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Join AirDrop
                      <span className="open-icon icon-plus">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-plus"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                      </span>
                    </button>
                  </p>
                  <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                      Starting Price: $0.01 per MOONHOP. Grab the lowest prices
                      for early supporters, and potentially make up to x50 at
                      launch.
                    </div>
                  </div>
                </article>
              </div>
            </article>
            <article className="article-box js-end">
              <h3 className="heading-h3 mb-24">STEP 4</h3>
              <span className="para-level-3">Follow and Claim</span>
              <p className="para-level-1 mt-12">
                Follow us on Twitter, Telegram, and Discord. Return to the
                AirDrop page, click "Claim AirDrop," and confirm the transaction
                in your wallet. Check your wallet balance for your new Pepe
                Layer2 tokens.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* /////////////////////////////////////////////////////// */}
      <section className="section-referral mt-96">
        <div className="container grid grid-2-cols gap ">
          <div className="referal-top">
            <h3 className="heading-h3 mb-24 mt-96 ">
              Earn a 10% Referral Bonus!
            </h3>
            <p className="para-level-2 ">
              Spread the word about $PEPE and enjoy a 10% referral bonus. Share
              the joy of $PEPE and help make the world a hoppier place with each
              referral!
            </p>
            <div className="">
              <a href="/airdrop/airdrop.html">
                <button className="btn download-btn mt-18 t-center">
                  Join AirDrop
                </button>
              </a>
            </div>
            <img src={refer} alt="refer" className="referal-cover" />
          </div>
          <div className="mt-96 referal-side">
            <article>
              <h3 className="heading-h3 ">
                <span>1.</span> Share Your Link
              </h3>
              <p className="para-level-2 mt-12">
                Copy your unique referral link and share it with friends,
                family, and your network.
              </p>
            </article>
            <article className="mt-18">
              <h3 className="heading-h3 ">
                <span>2</span> Watch Them Join
              </h3>
              <p className="para-level-2 mt-12">
                When someone uses your link to buy $PEPE, you’ll earn rewards.
              </p>
            </article>
            <article className="mt-18">
              <h3 className="heading-h3 ">
                <span>3</span> Enjoy Your 10% Bonus
              </h3>
              <p className="para-level-2 mt-12">
                Receive a 10% referral bonus for each successful referral and
                watch your rewards grow!
              </p>
            </article>
          </div>
        </div>
      </section>
      {/* ///////////////////////////////////////////////////////////////// */}
      <section className=" mt-96">
        <div className="container">
          <div className="box border-radius-48 t-center bg-color">
            <h2 className="secondary-heading mb-24 ">Stay in the Loop!</h2>
            <p className="para-level-2 box-para-2">
              Become part of the $PEPE family—follow us for the latest updates,
              exclusive content, and vibrant discussions. Dive in and connect
              with like-minded enthusiasts today!
            </p>
            <div className="community-section">
              <p>Join Our Pepecoin Community today!</p>
              <div className="icon-wrapper">
                <i className="fab fa-reddit main-icon" />
              </div>
              <div className="social-icons">
                <i className="fab fa-github" />
                <i className="fab fa-telegram-plane" />
                <i className="fab fa-discord" />
                <i className="fab fa-x-twitter" />
                <i className="fas fa-coins" />
                <i className="fas fa-chart-line" />
                <i className="fas fa-frog" />
                <i className="fas fa-exchange-alt" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-company">
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img src={bitcoinst} alt="Company 1" />
            </div>
            <div className="slide">
              <img src={cointelegraph} alt="Company 2" />
            </div>
            <div className="slide">
              <img src={cryptonews} alt="Company 3" />
            </div>
            <div className="slide">
              <img src={techopedia} alt="Company 4" />
            </div>
            <div className="slide">
              <img src={bitcoinst} alt="Company 5" />
            </div>
            <div className="slide">
              <img src={cointelegraph} alt="Company 6" />
            </div>
            <div className="slide">
              <img src={cryptonews} alt="Company 7" />
            </div>
            <div className="slide">
              <img src={techopedia} alt="Company 8" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-form">
        <div className="grid grid-2-cols gap ">
          <article className="form-frog">
            {/* <img src="/src/img/form-frog.png" alt=""> */}
            <img src={contact} alt />
          </article>
          <article className="form-box">
            <form action className="form">
              <input
                type="text"
                placeholder="John"
                className="mb-24 input-field"
                required
              />
              <input
                type="text"
                placeholder="Doe"
                className="mb-24 input-field"
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="johan@devgmail.com"
                className="mb-24 input-field"
                required
              />
              <div className="checkbox-field">
                <input type="checkbox" name=" " required id />
                <a className="privacy-policy ">
                  By submitting this form you agree to our Terms and Privacy
                  Policy
                </a>
              </div>
              <div className="checkbox-field mt-12">
                <input type="checkbox" name id required />
                <a className="privacy-policy ">
                  Yes, please keep me updated on PEPE news, events and offers.
                </a>
              </div>
              <div className="t-center">
                <button
                  type="submit"
                  className="btn send-me border-radius-24 mb-24 "
                >
                  Send
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
      <footer className="footer">
        <div className="container grid grid-4-cols mt-64">
          <div className>
            <ul className="footer-main-list">
              <li>
                <a href className="para-level-3">
                  $PEPE Whitepaper
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  Solidproof Certification
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  Coinsult Certification
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div className>
            <ul className="footer-main-list">
              <li>
                <a href className="para-level-3">
                  User Agreement
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  Privacy &amp; Cookies
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  Risk Advisory
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  User Commitments
                </a>
              </li>
            </ul>
          </div>
          <div className>
            <ul className="footer-main-list">
              <li>
                <a href className="para-level-3">
                  Twitter
                </a>
              </li>
              <li>
                <a href className="para-level-3">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-logo-box">
            <img src={logo} alt className="footer-logo" />
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2024 Pepe Layer2 Campaign. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
function newFunction() {
  const sectionHeroEl = document.querySelector("section-hero");

  const obs = new IntersectionObserver(
    function (entity) {
      const ent = entity[0];

      if (ent.isIntersecting == false) document.body.classList.add("sticky");

      if (ent.isIntersecting == true) document.body.classList.remove("sticky");
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }
  );

  obs.observe(sectionHeroEl);
}
