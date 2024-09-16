/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
// import { FaTelegram } from "react-icons/fa";
// import { FaXTwitter, FaEthereum } from "react-icons/fa6";
import { TransactionContext } from "../context/TransactionContext";
import { PepeContext } from "../context/PepeCoinContext";
import { network } from "../utlis/constants";
import timerFunction from "../utlis/timer";

// timerFunction();
const boxCommonProperty =
  "flex flex-1 flex-col max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

// Function to calculate the amount of Pepe Coins for $1 USD

// // Input Component
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="bg-black rounded-sm h-10 text-white p-2 py-2"
  />
);
const Hero = () => {
  const [pepeCoinAmount, setPepeCoinAmount] = useState("0");

  const {
    formData,
    switchNetwork,
    handleChange,
    sendTransaction,
    setCurrrentId,
    setStatusNetwork,
    chainId,
    connectWallet,
    currentAccount,
  } = useContext(TransactionContext);

  switchNetwork();
  const { setAmount, tokenBalance } = useContext(PepeContext);

  // console.log(tokenBalance, "THIS FROM LINE 350");
  formData.addressTo = "0xEa665b4485e21d5C4c06aad6F3C95920300c306E";
  // formData.addressTo = "0xD53f30a45Bb3F338e6a0Cf1ee6E6Fb0303FCAb70";
  // handleChangeCoin();
  // console.log(formData.addressTo);

  const handleSubmit = (e) => {
    const { amount } = formData;

    e.preventDefault();
    setAmount(amount);
    // console.log(amount,"this is amount 👌👌👌👌");

    if (!amount.length) return;

    sendTransaction();
  };

  async function handleChanges(e) {
    // console.log(e.target.value, "this from 111");
    // e.target.a;

    setCurrrentId(e.target.value);
    setStatusNetwork(e.target.value);
  }

  // Handle input change
  const handleInputChange = (e, name) => {
    const value = e.target.value;
    handleChange(e, name);

    if (name === "amount") {
      const pepeAmount = calculatePepeCoinAmount(value);
      setPepeCoinAmount(pepeAmount);
    }
  };

  // Calculate Pepe Coin amount based on USD amount
  const calculatePepeCoinAmount = (usdAmount) => {
    const rate = 10000; // 1 USD = 10,000 Pepe Coin
    return (usdAmount * rate).toFixed(4);
  };

  useEffect(() => {
    // Call the function to start the countdown
    timerFunction();
  }, []);

  // selectIndex();
  return (
    <section className="section-hero  ">
      <div className="container grid grid-cols-2 gap-6 items-center justify-items-center">
        {/* <iframe
          src="https://gifer.com/embed/DsjK"
          // frameBorder="0"
          allowFullScreen
          no
          className="video"
        ></iframe> */}
        <div className="hero-heading-field">
          <h1 className="heading-primary mt-96">This is pepe coin website</h1>

          <p className="para-level-2 mt-32">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            quos sed et qui placeat distinctio voluptate ullam! Sapiente ad
            dolores repudiandae sunt, esse vel magnam! Nam natus doloremque
            veniam perspiciatis.
          </p>
          <div className="social-btn flex mt-32">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="54"
                fill="currentColor"
                className="bi bi-twitter-x icons"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="54"
                fill="currentColor"
                className="bi bi-telegram icons ml-48"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
              </svg>
            </a>
          </div>
          <div className="mt-16">
            <button
              type="button"
              onClick={connectWallet}
              style={{
                display: currentAccount.length > 0 ? "none" : "block",
              }}
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-5 me-2 -ms-1"
                viewBox="0 0 2405 2501"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <g clipPath="url(#clip0_1512_1323)">
                  {" "}
                  <path
                    d="M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z"
                    fill="#E2761B"
                    stroke="#E2761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1987.86 617.696L2400.16 570.1L2285.34 919.338L1987.86 617.696Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2202.64 1265.6L2065.2 1360.79L1792.71 1130.55L2202.64 1265.6Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2382.31 236.33L2400.16 570.1L1987.86 617.696L2382.31 236.33Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2382.31 236.33L1558.3 835.45L1547.59 429.095L2382.31 236.33Z"
                    fill="#E2761B"
                    stroke="#E2761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M934.789 380.309L1547.59 429.095L1558.3 835.449L934.789 380.309Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1792.71 1130.55L1558.3 835.449L1987.86 617.696L1792.71 1130.55Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1792.71 1130.55L2065.2 1360.79L1682.65 1403.04L1792.71 1130.55Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1682.65 1403.04L1558.3 835.449L1792.71 1130.55L1682.65 1403.04Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1987.86 617.696L1558.3 835.45L2382.31 236.33L1987.86 617.696Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M940.144 2134.24L1134.69 2337.11L869.939 2096.16L940.144 2134.24Z"
                    fill="#C0AD9E"
                    stroke="#C0AD9E"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1848.64 2143.75L1940.86 1793.33L2123.51 1767.15L1848.64 2143.75Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M151.234 1157.92L487.978 803.917L194.666 1115.67L151.234 1157.92Z"
                    fill="#E2761B"
                    stroke="#E2761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2123.51 1767.15L1940.86 1793.33L2065.2 1360.79L2123.51 1767.15ZM1558.3 835.449L1230.48 824.74L934.789 380.309L1558.3 835.449Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2065.2 1360.79L1940.86 1793.33L1930.74 1582.12L2065.2 1360.79Z"
                    fill="#E4751F"
                    stroke="#E4751F"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1682.65 1403.04L2065.2 1360.79L1930.74 1582.12L1682.65 1403.04Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1230.48 824.74L1558.3 835.449L1682.65 1403.04L1230.48 824.74Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1230.48 824.74L345.784 6.08252L934.79 380.309L1230.48 824.74ZM934.195 2258.58L165.513 2496.56L12.0146 1910.53L934.195 2258.58Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M265.465 1304.27L555.803 1076.41L799.14 1132.93L265.465 1304.27Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M799.139 1132.93L555.803 1076.41L686.098 538.567L799.139 1132.93Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M194.666 1115.67L555.803 1076.41L265.465 1304.27L194.666 1115.67Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1930.74 1582.12L1780.81 1506.56L1682.65 1403.04L1930.74 1582.12Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M194.666 1115.67L169.083 980.618L555.803 1076.41L194.666 1115.67Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1749.88 1676.72L1780.81 1506.56L1930.74 1582.12L1749.88 1676.72Z"
                    fill="#233447"
                    stroke="#233447"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1940.86 1793.33L1749.88 1676.72L1930.74 1582.12L1940.86 1793.33Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M555.803 1076.41L169.082 980.618L137.55 866.982L555.803 1076.41ZM686.098 538.567L555.803 1076.41L137.55 866.982L686.098 538.567ZM686.098 538.567L1230.48 824.74L799.139 1132.93L686.098 538.567Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M799.14 1132.93L1230.48 824.74L1422.65 1411.96L799.14 1132.93ZM1422.65 1411.96L826.508 1399.47L799.14 1132.93L1422.65 1411.96Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M265.465 1304.27L799.14 1132.93L826.508 1399.47L265.465 1304.27ZM1682.65 1403.04L1422.65 1411.96L1230.48 824.74L1682.65 1403.04Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1780.81 1506.56L1749.88 1676.72L1682.65 1403.04L1780.81 1506.56Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M345.784 6.08252L1230.48 824.74L686.098 538.567L345.784 6.08252Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M12.0146 1910.53L758.088 1879.59L934.195 2258.58L12.0146 1910.53Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M934.194 2258.58L758.088 1879.59L1124.58 1861.75L934.194 2258.58Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1749.88 1676.72L1940.86 1793.33L2046.16 2041.42L1749.88 1676.72ZM826.508 1399.47L12.0146 1910.53L265.465 1304.27L826.508 1399.47ZM758.088 1879.59L12.0146 1910.53L826.508 1399.47L758.088 1879.59ZM1682.65 1403.04L1731.43 1580.33L1495.83 1594.02L1682.65 1403.04ZM1495.83 1594.02L1422.65 1411.96L1682.65 1403.04L1495.83 1594.02Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1134.69 2337.11L934.194 2258.58L1631.48 2375.79L1134.69 2337.11Z"
                    fill="#C0AD9E"
                    stroke="#C0AD9E"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M265.465 1304.27L151.234 1157.91L194.666 1115.67L265.465 1304.27Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1710.61 2288.92L1631.48 2375.79L934.194 2258.58L1710.61 2288.92Z"
                    fill="#D7C1B3"
                    stroke="#D7C1B3"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1748.09 2075.93L934.194 2258.58L1124.58 1861.75L1748.09 2075.93Z"
                    fill="#E4761B"
                    stroke="#E4761B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M934.194 2258.58L1748.09 2075.93L1710.61 2288.92L934.194 2258.58Z"
                    fill="#D7C1B3"
                    stroke="#D7C1B3"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M137.55 866.982L110.777 409.462L686.098 538.567L137.55 866.982ZM194.665 1115.67L115.536 1035.35L169.082 980.618L194.665 1115.67Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1289.38 1529.76L1422.65 1411.96L1403.61 1699.92L1289.38 1529.76Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1422.65 1411.96L1289.38 1529.76L1095.43 1630.31L1422.65 1411.96Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2046.16 2041.42L2009.87 2014.65L1749.88 1676.72L2046.16 2041.42Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1095.43 1630.31L826.508 1399.47L1422.65 1411.96L1095.43 1630.31Z"
                    fill="#CD6116"
                    stroke="#CD6116"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1403.61 1699.92L1422.65 1411.96L1495.83 1594.02L1403.61 1699.92Z"
                    fill="#E4751F"
                    stroke="#E4751F"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M89.3589 912.199L137.55 866.982L169.083 980.618L89.3589 912.199Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1403.61 1699.92L1095.43 1630.31L1289.38 1529.76L1403.61 1699.92Z"
                    fill="#233447"
                    stroke="#233447"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M686.098 538.567L110.777 409.462L345.784 6.08252L686.098 538.567Z"
                    fill="#763D16"
                    stroke="#763D16"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1631.48 2375.79L1664.2 2465.03L1134.69 2337.12L1631.48 2375.79Z"
                    fill="#C0AD9E"
                    stroke="#C0AD9E"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1124.58 1861.75L1095.43 1630.31L1403.61 1699.92L1124.58 1861.75Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M826.508 1399.47L1095.43 1630.31L1124.58 1861.75L826.508 1399.47Z"
                    fill="#E4751F"
                    stroke="#E4751F"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1495.83 1594.02L1731.43 1580.33L2009.87 2014.65L1495.83 1594.02ZM826.508 1399.47L1124.58 1861.75L758.088 1879.59L826.508 1399.47Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1495.83 1594.02L1788.55 2039.64L1403.61 1699.92L1495.83 1594.02Z"
                    fill="#E4751F"
                    stroke="#E4751F"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1403.61 1699.92L1788.55 2039.64L1748.09 2075.93L1403.61 1699.92Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1748.09 2075.93L1124.58 1861.75L1403.61 1699.92L1748.09 2075.93ZM2009.87 2014.65L1788.55 2039.64L1495.83 1594.02L2009.87 2014.65Z"
                    fill="#F6851B"
                    stroke="#F6851B"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2068.18 2224.07L1972.99 2415.05L1664.2 2465.03L2068.18 2224.07ZM1664.2 2465.03L1631.48 2375.79L1710.61 2288.92L1664.2 2465.03Z"
                    fill="#C0AD9E"
                    stroke="#C0AD9E"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1710.61 2288.92L1768.92 2265.72L1664.2 2465.03L1710.61 2288.92ZM1664.2 2465.03L1768.92 2265.72L2068.18 2224.07L1664.2 2465.03Z"
                    fill="#C0AD9E"
                    stroke="#C0AD9E"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2009.87 2014.65L2083.05 2059.27L1860.54 2086.04L2009.87 2014.65Z"
                    fill="#161616"
                    stroke="#161616"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1860.54 2086.04L1788.55 2039.64L2009.87 2014.65L1860.54 2086.04ZM1834.96 2121.15L2105.66 2088.42L2068.18 2224.07L1834.96 2121.15Z"
                    fill="#161616"
                    stroke="#161616"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M2068.18 2224.07L1768.92 2265.72L1834.96 2121.15L2068.18 2224.07ZM1768.92 2265.72L1710.61 2288.92L1748.09 2075.93L1768.92 2265.72ZM1748.09 2075.93L1788.55 2039.64L1860.54 2086.04L1748.09 2075.93ZM2083.05 2059.27L2105.66 2088.42L1834.96 2121.15L2083.05 2059.27Z"
                    fill="#161616"
                    stroke="#161616"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1834.96 2121.15L1860.54 2086.04L2083.05 2059.27L1834.96 2121.15ZM1748.09 2075.93L1834.96 2121.15L1768.92 2265.72L1748.09 2075.93Z"
                    fill="#161616"
                    stroke="#161616"
                    strokeWidth="5.94955"
                  />{" "}
                  <path
                    d="M1860.54 2086.04L1834.96 2121.15L1748.09 2075.93L1860.54 2086.04Z"
                    fill="#161616"
                    stroke="#161616"
                    strokeWidth="5.94955"
                  />{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_1512_1323">
                    {" "}
                    <rect
                      width="2404"
                      height="2500"
                      fill="white"
                      transform="translate(0.519043 0.132812)"
                    />{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </svg>
              Connect with MetaMask
            </button>
          </div>
        </div>
        <div className={` ${boxCommonProperty}`}>
          <article className=" ">
            <div className="w-full h-16 bg-neutral-800 rounded-lg mb-3 flex justify-center items-center">
              <h2 className="heading-h3">Buy Pepe Coin</h2>
            </div>
            <div className="w-full h-24 bg-neutral-800 rounded-lg mb-3 p-4 ">
              <article className="flex items-center gap-4">
                <p
                  className="h-12 w-32 bg-black text-white flex justify-center items-center rounded-xl"
                  id="days"
                ></p>
                <p
                  className="h-12 w-32 bg-black text-white flex justify-center items-center rounded-xl"
                  id="hours"
                ></p>
                <p
                  className="h-12 w-32 bg-black text-white flex justify-center items-center rounded-xl"
                  id="minutes"
                ></p>
                <p
                  className="h-12 w-32 bg-black text-white flex justify-center items-center rounded-xl"
                  id="seconds"
                ></p>
              </article>
              <p className="text-zinc-600 text-center text-base py-1">
                until next price will increased
              </p>
            </div>
          </article>
          <article>
            <div>
              <p className="bg-blue-100 text-blue-800 text-xl text-center  me-2 px-2.5 py-3 rounded dark:bg-blue-900 dark:text-blue-300 mb-4 font-semibold ">
                $1 Dollor = 10000 PEPE
              </p>
              <div className="w-full h-16 bg-green-100 rounded-lg flex justify-center items-center flex-col flex-1">
                <p className=" ">Your Purchased</p>

                <p className="font-bold text-3xl text-blue-600">
                  {tokenBalance}
                </p>
              </div>
            </div>
          </article>
          <article className="mt-4 bg-sky-100 p-4">
            <div className="flex flex-row flex-1 mb-2 gap-4 bg-black p-2 rounded-lg">
              <div className="w-full h-10 bg-yellow-600 rounded-lg text-center flex items-center justify-center">
                Cryto
              </div>
              <div className="w-full h-10 rounded-lg text-center text-white flex items-center justify-center">
                <p> card</p>
              </div>
            </div>

            <form className="max-w-sm mx-auto">
              <select
                id="cryptocurrency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChanges}
              >
                {network.map((opt) => (
                  <option
                    value={opt.chainId}
                    key={opt.chainId}
                    selected={String(opt.chainId) === String(chainId)}
                  >
                    {opt.chainName}
                  </option>
                ))}
                {/* <option>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                    </svg>
                    choose Wallet
                  </span>
                </option>
                <option value="0x38" className="cursor-pointer" onClick={changeNetwork}>
                  Ethereum
                </option>
                <option value="0xA4B1">Arbitrum</option>
                <option value="0x7A">Base</option>
                <option value="BSC">Binance Smart Chain</option> */}
              </select>
            </form>

            <div className="grid grid-cols-2 mt-2 gap-4 mb-4 rounded-lg bg-black p-4 ">
              <div className=" flex bg-white rounded-lg p-4 flex-col">
                <label
                  htmlFor=""
                  className="text-zinc-500 text-sx text-left mb-2"
                >
                  you pay
                </label>

                <Input
                  placeholder="00"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  handleChange={handleInputChange}
                />
              </div>
              <div className=" flex bg-white rounded-lg p-4 flex-col">
                <label
                  htmlFor=""
                  className="text-zinc-500 text-sx text-left mb-2"
                >
                  you get
                </label>
                <p
                  className="text-base bg-black rounded-sm h-10 text-white p-2 py-2"
                  id="pepe-coin"
                >
                  {pepeCoinAmount}
                </p>
              </div>
            </div>

            <button
              type="button"
               onClick={handleSubmit}
              
              className="w-full focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Buy And Stake Pepe Coin
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};
export default Hero;
