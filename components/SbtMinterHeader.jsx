import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import sbtFactoryAbi from "../abi/sbtFactoryAbi.json";
import sbtDomainAbi from "../abi/sbtDomainAbi.json";
import { ethers } from "ethers";
import { config } from "../abi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "@/components/ConfirmationModal";

const SbtMinter = () => {
  const { address, isConnected } = useAccount();
  const [userDomain, setUserDomain] = useState("");
  const [selectTld, setSelectTld] = useState(".sbt");
  const [selectTldPrice, setSelectTldPrice] = useState("0.003");
  const [domainFactory, setDomainFactory] = useState("");
  const [tlds, setTlds] = useState();
  const [openMintModal, setOpenMintModal] = useState(false);
  const [domainHash, setDomainHash] = useState("");

  const notify = (e) => {
    e.preventDefault();

    toast.error("Please connect a Compatible Web3 Wallet", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleMintOnClose = () => setOpenMintModal(false);

  const getTldPrice = async (tld) => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://scroll-sepolia.chainstacklabs.com"
    );

    const tldAddress = await domainFactory.tldNamesAddresses(tld);

    const domainContract = new ethers.Contract(
      tldAddress,
      sbtDomainAbi,
      provider
    );

    const price = await domainContract.price();
    const formatPrice = ethers.utils.formatEther(price);
    setSelectTldPrice(formatPrice);
    console.log(formatPrice);
  };

  const getTldDomains = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://scroll-sepolia.chainstacklabs.com"
    );
    // const signer = provider.getSigner();

    const newDomainFactory = new ethers.Contract(
      config.sbtFactoryAddress,
      sbtFactoryAbi,
      provider
    );

    setDomainFactory(newDomainFactory);

    const tldAddresses = await newDomainFactory.getTldsArray().then((res) => {
      setTlds(res);
      console.log(res);
    });
  };

  console.log(domainFactory);

  const handleChange = (event) => {
    setSelectTld(event.target.value);
    getTldPrice(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    getTldDomains();
  }, []);

  const mintDomain = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const formatPrice = await ethers.utils.parseUnits(selectTldPrice, 18);
    const formattedName = userDomain.replace(/\s+/g, "").toLowerCase().trim();
    const tldAddress = await domainFactory.tldNamesAddresses(selectTld);

    console.log(formattedName, tldAddress, formatPrice);

    const domainContract = new ethers.Contract(
      tldAddress,
      sbtDomainAbi,
      signer
    );

    const mintNotification = toast.loading("Please wait! Minting your NFT");

    const mint = await domainContract.mint(formattedName, address, {
      value: formatPrice,
    });
    const receipt = await mint.wait();
    console.log(receipt);

    toast.update(mintNotification, {
      render: "Mint Completed Successfully",
      type: "success",
      isLoading: false,
      autoClose: 7000,
    });

    const txHash = await receipt.transactionHash;
    console.log(txHash);

    setDomainHash(txHash);
    setOpenMintModal(true);
  };
  // console.log(isConnected);

  return (
    <section>
      <div className="text-center flex flex-col items-center ">
        <h1 className="mt-10 text-3xl font-bold text-secondary-white">
          Mint your SBT Domain
        </h1>
        <div className="h-[250px] w-[350px]">
          <img src="/planet-14.png" alt="planet" className=" mt-4 " />
        </div>
      </div>

      <form>
        <div className="mt-10 mb-6 flex items-center md:mx-[500px] text-center">
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-l-2xl outline-none font-bold focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
            placeholder="Enter your preferred name"
            required
            value={userDomain}
            onChange={(e) => setUserDomain(e.target.value)}
          />
          <div className="p-0 rounded-r-2xl">
            <select
              className="focus:outline-none h-[42px]  rounded-r-2xl text-gray-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold"
              onChange={handleChange}
            >
              {tlds
                ? tlds.map((option, index) => (
                    <option key={index} value={option} className="p-2">
                      {option}
                    </option>
                  ))
                : "..."}
            </select>
          </div>
        </div>

        <p className="text-white font-bold text-center mb-4">
          Domain Price: {selectTldPrice} ETH
        </p>

        <ConfirmationModal
          txHash={domainHash}
          openMintModal={openMintModal}
          handleOnClose={handleMintOnClose}
        />

        {isConnected && (
          <button
            type="submit"
            className="text-white font-bold border-2 border-[button-gradient] flex mx-auto justify-center bg-slate-700 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black"
            onClick={mintDomain}
          >
            Mint
          </button>
        )}
        {!isConnected && (
          <button
            type="submit"
            className="text-white font-bold border-2 border-[button-gradient] flex mx-auto justify-center bg-slate-600 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={notify}
          >
            Mint
          </button>
        )}
      </form>
      <ToastContainer />
    </section>
  );
};

export default SbtMinter;
