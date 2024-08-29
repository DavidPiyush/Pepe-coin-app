import {
  fetchData,
  fetchDataUser,
  // handleClick,
  postDataFromUser,
  updateUserData,
  fetchUserByReferId,
  updateUserByReferedId,
  socialLinks,
  ClaimBtn,
} from "../utlis/api.js";
import earnPepe from "../image/refers/earnPepe.mp4";
import refer from "../image/refers/refer.png";
import refersAnimation from "../image/refers/pepe-refer-animation.mp4";
import reward from "../image/refers/pepe-get-rewards.mp4";
import generateRandomToken from "../utlis/tokenGenerator";
import { TransactionContext } from "../context/TransactionContext";
import { ReferContext } from "../context/RefersContext";
import { useContext, useEffect, useState, useMemo } from "react";
import "../style/refer.css";
// import startTimer from "../utlis/countDown.jsx";
import VisitedLink from "./VisitedLink.jsx";
import TimerComponent from "../utlis/countDown.jsx";
import "../style/refer.css";

const randomCode = generateRandomToken();

const Refer = () => {
  const [token, setToken] = useState([0]);
  const [todayClaim, setTodayClaim] = useState(0);

  const { currentAccount, connectWallet } = useContext(TransactionContext);

  // to set data in ui
  const [taskClaim, setTaskClaim] = useState(0);
  const [dailyClaim, setDailyClaim] = useState(0);
  const [referClaim, setReferClaim] = useState(0);
  const [totalClaimBal, setTotalCalim] = useState(0);
  const [referFriend, setReferFriend] = useState(0);
  const [ethereumAccount, setEthereumAcount] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [linkReward, setLinkReward] = useState(0);
  const [link, setLink] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(1);
  const [click, setClick] = useState(0);
  const [btnEl, setBtnEl] = useState("");

  function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  const cookieValue = getCookie("referralCode");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verifyUser = async () => {
    try {
      const { data } = await fetchUserByReferId(cookieValue);
      const userData = data.data.user;

      if (currentAccount === ethereumAccount) return;
      if (
        cookieValue === userData.referralCode &&
        currentAccount !== userData.ethereumId &&
        currentAccount.length > 0 &&
        !userData.referredUsers.some(
          (user) => user.ethereumId === currentAccount
        )
      ) {
        const obj = {
          referEarn: 1000,
          referredUsers: {
            ethereumId: currentAccount,
            status: "success",
            referTime: new Date(),
          },
        };
        const update = await updateUserByReferedId(userData.referralCode, obj);
        console.log("VERIFIED USER", update);
      }
    } catch (error) {
      console.error("NOT VERIFIED USER", error);
    }
  };

  useEffect(() => {
    verifyUser();
  }, [verifyUser, currentAccount]);

  const handleClaim = async (e) => {
    const el = e.target;
    setBtnEl(el);
    setClickCount((cur) => cur + 1);
    checkBtnClick();
  };

  async function checkBtnClick() {
    if (click < 2) {
      const res = await ClaimBtn(currentAccount, clickCount);
      console.log(res.data);
      setTodayClaim(100);
      setIsDisabled(true);
      btnEl.classList.add("disabled");
    }
  }
  // console.log(claimToday); // This will log "100"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referLink);
      // console.log("Text copied to clipboard");
    } catch (err) {
      // console.error("Failed to copy text: ", err);
      throw new Error("FAILED TO COPY ADDRESSS.PLEASE TRY AGAIN", err);
    }
  };

  const links = document.querySelectorAll(".social-link");

  function checkVistedLink() {
    link.forEach((l) => {
      for (let el of links) {
        if (l == el.href) {
          setIsDisabled(true);
          el.classList.add("disabled");
          break;
        }
      }
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    const data = e.target;

    setSocialLink(() => data.href);
    setLinkReward(data.dataset.reward);

    window.open(data.href, "_blank");
  };

  // console.log(socialLink, linkReward, "this from line 116 🔗🔗🔗🔗");
  const postObj = useMemo(() => {
    return {
      ethereumId: currentAccount,
      totalBalance: 0,
      referralCode: randomCode,
      todayClaim: 0,
      totalEarnDay: 0,
      referEarn: 0,
      referredUser: [],
    };
  }, [currentAccount]);

  const createAccount = async () => {
    if (currentAccount && ethereumAccount !== currentAccount) {
      await postDataFromUser(postObj);
    }
  };

  const updateAccount = async () => {
    try {
      if (ethereumAccount === currentAccount && currentAccount.length > 0) {
        const res = await updateUserData(currentAccount, {
          todayClaim: todayClaim,
          totalEarnDay: linkReward,
        });
        console.log("UPDATE SUCCESSFUL!", res);
      }
    } catch (error) {
      console.error("UNABLE TO UPDATE ACCOUNT!", error);
    }
  };

  async function updateSocialLink() {
    if (ethereumAccount) {
      const link = await socialLinks(currentAccount, socialLink);
      console.log(link.data, " this from line 154");
    }
  }

  useEffect(() => {
    updateSocialLink();
  }, [socialLink]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const updateUI = async () => {
    try {
      if (currentAccount.length === 0) return;
      const { data } = await fetchDataUser(currentAccount); // to find user on their Ethereum address
      const setVariable = await data.user;

      // console.log(setVariable.socialLinks, "this from line 158");
      setLink(setVariable.socialLinks);
      setClick(setVariable.clickCount);

      // Only update the state if the data has changed
      if (setVariable) {
        if (setVariable.todayClaim !== dailyClaim) {
          setDailyClaim(setVariable.todayClaim);
        }
        if (setVariable.totalEarnDay !== linkReward) {
          setTaskClaim(setVariable.totalEarnDay);
        }
        if (setVariable.referEarn !== referClaim) {
          setReferClaim(setVariable.referEarn);
        }
        if (setVariable.totalBalance !== totalClaimBal) {
          setTotalCalim(setVariable.totalBalance);
        }
        if (setVariable.referralCode !== token) {
          setToken(setVariable.referralCode);
        }
        if (setVariable.referredUsers.length !== referFriend) {
          setReferFriend(setVariable.referredUsers.length);
        }
        if (setVariable.ethereumId !== ethereumAccount) {
          setEthereumAcount(setVariable.ethereumId);
        }
      }
      console.log("sucessfully updated UI");
    } catch (error) {
      console.error(
        "Can't find the user on your currentAccount address",
        error
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentAccount.length > 0) {
        updateAccount();
      }
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [currentAccount, updateAccount]);

  useEffect(() => {
    updateUI();
    checkVistedLink();
  }, [updateUI]);

  useEffect(() => {
    fetchData();
  }, [currentAccount]);

  const baseUrl = window.location.origin;
  // const referLink = `https://pepelayer2.com/referral/${token}`;
  const referLink = `${baseUrl}/refer/${token.length > 0 ? token : ""}`;

  return (
    <div className="refer-body">
      <header className="header-el">
        <button
          id="connectMetaMaskButton"
          className="metamask-button"
          onClick={connectWallet}
        >
          {currentAccount.length > 0
            ? `Total Earn: ${totalClaimBal}`
            : "Connect With Metamask"}
        </button>

        <div id="walletAddress"></div>
        <div className="container-el">
          <h1 className="">AIRDROP PEPE LAYER2</h1>
        </div>
      </header>
      <main>
        <div className="container-el">
          <div className="section-el">
            <section id="tasks ">
              <p className="heading-airdrop">
                Complete these daily tasks and earn coins!...
              </p>
              <h2 className="daily-h2-task h2">Daily Tasks</h2>
              <div id="tasks-list">
                <div className="task">
                  <VisitedLink
                    url="https://x.com/?lang=en"
                    className="cursor-pointer social-link"
                    title={"Follow us on Twitter"}
                    value={10}
                    disabled={isDisabled}
                    currentAccount={currentAccount}
                    onClickLink={(e) => handleClick(e)}
                  />
                  <span className="reward">+10 Coins</span>
                </div>
                <div className="task">
                  <VisitedLink
                    url="https://telegram.org/"
                    className="cursor-pointer social-link"
                    title={"Join our Telegram group"}
                    value={20}
                    disabled={isDisabled}
                    currentAccount={currentAccount}
                    onClickLink={(e) => handleClick(e)}
                  />

                  <span className="reward">+20 Coins</span>
                </div>
                <div className="task">
                  <VisitedLink
                    url="https://www.facebook.com/"
                    className="cursor-pointer"
                    title={"Share our post on Facebook"}
                    value={15}
                    disabled={isDisabled}
                    currentAccount={currentAccount}
                    onClickLink={(e) => handleClick(e)}
                  />

                  <span className="reward">+15 Coins</span>
                </div>
                <div className="task">
                  <VisitedLink
                    url="https://www.youtube.com/"
                    className="cursor-pointer"
                    title={"Subscribe Our Youtube Channel"}
                    value={25}
                    disabled={isDisabled}
                    currentAccount={currentAccount}
                    onClickLink={(e) => handleClick(e)}
                  />

                  <span className="reward">+25 Coins</span>
                </div>
              </div>
              <div className="total-coins">
                <h3>
                  Total Coins: <span id="coin-count">{taskClaim}</span>
                </h3>
              </div>
            </section>
          </div>
        </div>

        <section id="intro" className="section-el">
          <div className="intro-content">
            <img src={refer} alt="Pepe Coin" className="intro-image" />
            <div className="intro-text">
              <h2>Earn More with Pepe Coin</h2>
              <p>
                Join our referral programme and earn Pepe Coins by inviting your
                friends!
              </p>
              <button id="joinNowButton button">Invite Now</button>
              <a href="/airdrop/">
                <button id="joinNowButton">AirDrop</button>
              </a>
            </div>
          </div>
        </section>
        <section className="section-el">
          <div className="container-el">
            <div className="bubble bubble1"></div>
            <div className="bubble bubble2"></div>
            <div className="bubble bubble3"></div>
            <div className="bubble bubble4"></div>
            <div className="bubble bubble5"></div>
            <div className="bubble bubble6"></div>
            <div className="bubble bubble7"></div>
            <div className="bubble bubble8"></div>
            <div className="bubble bubble9"></div>
            <div className="challenge-box">
              {ethereumAccount.length > 0 ? (
                <p>
                  <h2 className="h2">Daily Challenge</h2>
                  <p id="challenge">Complete today&apos;s task</p>
                </p>
              ) : (
                ""
              )}

              <button
                id="claimButton button"
                disabled={isDisabled}
                onClick={(e) =>
                  ethereumAccount.length > 0 ? handleClaim(e) : createAccount()
                }
              >
                {ethereumAccount.length > 0
                  ? "Claim Today's Coins"
                  : "Generate Refer link"}
              </button>
              {ethereumAccount.length > 0 ? (
                <p id="coins">Coins Earned: {dailyClaim} PEPE TODAY!</p>
              ) : (
                " "
              )}
              {isDisabled && <TimerComponent />}
            </div>
          </div>
        </section>
        <section id="referralInfo" className="section-el">
          <div className="infoBox">
            <h3>Your Referral Link</h3>
            <input
              type="text"
              id="referralLink"
              className="input"
              value={referLink}
              readOnly
            />
            <button id="copyLinkButton button" onClick={copyToClipboard}>
              Copy Link
            </button>
          </div>
          <div className="infoBox">
            <h3>Your Referrals</h3>
            <p>
              <span id="referralCount">{referFriend}</span> Friends Referred
            </p>
          </div>
          <div className="infoBox">
            <h3>Earnings From Referrals</h3>
            <p>
              <span id="referralEarnings">{referClaim}</span> Pepe Coins Earned
            </p>
          </div>
        </section>
        <section id="howItWorks " className="section-el howItWorks">
          <h2 className="h2 h2-how">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <video
                src={refersAnimation}
                autoPlay
                className="step-image"
                loop
              />
              <h3>Invite Friends</h3>
              <p>Invite your friends using your unique referral link.</p>
            </div>
            <div className="step">
              <video src={earnPepe} autoPlay className="step-image" loop />
              <h3>Earn Coins</h3>
              <p>Your friends sign up and buy Pepe Coins.</p>
            </div>
            <div className="step">
              <video src={reward} autoPlay className="step-image" loop />
              <h3>Get Rewards</h3>
              <p>You earn a percentage of their purchases as Pepe Coins.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer-el">
        <div className="container-el">
          <p>© 2024 Pepe Layer2 Campaign. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Refer;
