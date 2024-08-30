import {
  fetchData,
  fetchDataUser,
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
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import "../style/refer.css";
import VisitedLink from "./VisitedLink.jsx";
import TimerComponent from "../utlis/countDown.jsx";

const randomCode = generateRandomToken();

const Refer = () => {
  const [token, setToken] = useState([0]);
  const [todayClaim, setTodayClaim] = useState(0);

  const { currentAccount, connectWallet } = useContext(TransactionContext);

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

  const getCookie = (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const cookieValue = getCookie("referralCode");

  const verifyUser = useCallback(async () => {
    try {
      const { data } = await fetchUserByReferId(cookieValue);
      const userData = data.data.user;

      if (
        currentAccount === ethereumAccount ||
        !currentAccount ||
        !userData ||
        userData.referredUsers.some(
          (user) => user.ethereumId === currentAccount
        )
      )
        return;

      if (
        cookieValue === userData.referralCode &&
        currentAccount !== userData.ethereumId
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
  }, [currentAccount, ethereumAccount, cookieValue]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const handleClaim = async (e) => {
    const el = e.target;
    console.log(el);
    setBtnEl(el);
    setClickCount((cur) => cur + 1);
    checkBtnClick();
  };

  const checkBtnClick = useCallback(async () => {
    if (click >= 2 && clickCount >= 2) return;
    if (click < 2 && clickCount < 2) {
      const res = await ClaimBtn(currentAccount, clickCount);
      console.log(res.data);
      setTodayClaim(100);
      // setIsDisabled(true);
      if (btnEl) {
        btnEl.classList.add("disabled");
      }
    }
  }, [click, clickCount, currentAccount, btnEl]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referLink);
    } catch (err) {
      throw new Error("FAILED TO COPY ADDRESS.PLEASE TRY AGAIN", err);
    }
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const datas = e.target;
      if (!datas) {
        console.error("No href found on the target element.");
        return;
      }
      const href = datas.href;

      const { data } = await fetchDataUser(currentAccount);
      const { socialLinks } = await data.user;
      console.log(socialLinks);

      // console.log(socialLinks.includes(href))
      if (socialLinks.includes(href)) {
        setIsDisabled(true);
        if (datas.classList) {
          datas.classList.add("disabled");
        } else {
          console.error("classList is undefined for the target element.");
        }

        console.log("true");
      } else {
        // If the link is not in the array, proceed with setting the reward and opening the link
        setSocialLink(href);
        setLinkReward(datas.dataset.reward);
        window.open(href, "_blank");
      }
    } catch (error) {
      console.error("Error checking link in database:", error);
    }
  };

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

  const createAccount = useCallback(async () => {
    if (currentAccount && ethereumAccount !== currentAccount) {
      await postDataFromUser(postObj);
    }
  }, [currentAccount, ethereumAccount, postObj]);

  const updateAccount = useCallback(async () => {
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
  }, [ethereumAccount, currentAccount, todayClaim, linkReward]);

  const updateSocialLink = useCallback(async () => {
    if (ethereumAccount) {
      const link = await socialLinks(currentAccount, socialLink);
      console.log(link.data, "this from line 154");
    }
  }, [ethereumAccount, currentAccount, socialLink]);

  useEffect(() => {
    updateSocialLink();
  }, [socialLink, updateSocialLink]);

  const updateUI = useCallback(async () => {
    try {
      if (currentAccount.length === 0) return;
      const { data } = await fetchDataUser(currentAccount); // to find user on their Ethereum address
      const setVariable = data.user;

      setClick(setVariable.clickCount);
      setLink(setVariable.socialLinks);

      if (setVariable) {
        setDailyClaim(setVariable.todayClaim);
        setTaskClaim(setVariable.totalEarnDay);
        setReferClaim(setVariable.referEarn);
        setTotalCalim(setVariable.totalBalance);
        setToken(setVariable.referralCode);
        setReferFriend(setVariable.referredUsers.length);
        setEthereumAcount(setVariable.ethereumId);
      }
      console.log("Successfully updated UI");
    } catch (error) {
      console.error(
        "Can't find the user on your currentAccount address",
        error
      );
    }
  }, [currentAccount]);

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
  }, [updateUI]);

  useEffect(() => {
    fetchData();
  }, [currentAccount]);

  const baseUrl = window.location.origin;
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
                    className={`${
                      link.includes("https://x.com/?lang=en") ? "disabled" : ""
                    }`}
                    title={"Follow us on Twitter"}
                    value={10}
                    disabled={link.includes("https://x.com/?lang=en")}
                    currentAccount={currentAccount}
                    onClickLink={(e) => handleClick(e)}
                  />
                  <span className="reward">+10 Coins</span>
                </div>
                <div className="task">
                  <VisitedLink
                    url="https://telegram.org/"
                    className={`${
                      link.includes("https://telegram.org/") ? "disabled" : ""
                    }`}
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
                    className={`${
                      link.includes("https://www.facebook.com/")
                        ? "disabled"
                        : ""
                    }`}
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
                    className={`${
                      link.includes("https://www.youtube.com/")
                        ? "disabled"
                        : ""
                    }`}
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
              <Button
                ethereumAccount={ethereumAccount}
                createAccount={createAccount}
                onClaim={handleClaim}
                isDisabled={isDisabled}
                clickCount={clickCount}
              />

              {ethereumAccount.length > 0 ? (
                <p id="coins">Coins Earned: {dailyClaim} PEPE TODAY!</p>
              ) : (
                " "
              )}
              {clickCount <= 2 && ethereumAccount.length > 0 ? (
                <TimerComponent />
              ) : (
                " "
              )}
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

function Button({ ethereumAccount, onClaim, createAccount, clickCount }) {
  console.log(clickCount);
  return (
    <button
      id="claimButton button"
      className={`${
        clickCount <= 2 && ethereumAccount.length > 0 ? "disabled" : " "
      }`}
      disabled={clickCount <= 2}
      onClick={(e) =>
        ethereumAccount.length > 0 ? onClaim(e) : createAccount()
      }
    >
      {ethereumAccount.length > 0
        ? "Claim Today's Coins"
        : "Generate Refer link"}
    </button>
  );
}
