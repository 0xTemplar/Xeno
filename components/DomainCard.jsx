"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import { config } from "@/abi";
import { ethers } from "ethers";
import domainResolverAbi from "../abi/xenoDomainResolver.json";
import "react-toastify/dist/ReactToastify.css";
import UpdateMetadata from "./modals/UpdateMetadata";
import TransferDomain from "./modals/TransferDomain";
import { formatCard } from "@/utils/formatCard";

// const image =
//   "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8&w=1000&q=80";

// const title = "Yellow";

const DomainCard = ({ domainName, tld, image }) => {
  const [openMintModal, setOpenMintModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [tldAddress, setTldAddress] = useState("");

  const handleMintOnClose = () => setOpenMintModal(false);
  const handleTransferOnClose = () => setOpenTransferModal(false);

  const openUpdate = () => setOpenMintModal(true);
  const openTransfer = () => setOpenTransferModal(true);

  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const domainResolver = new ethers.Contract(
      config.domainResolverAddress,
      domainResolverAbi,
      signer
    );

    const tldAddress = await domainResolver.getTldAddress(tld);
    setTldAddress(tldAddress);
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div
      className={`w-[330px] rex2 h-full cursor-pointer relative overflow-hidden bg-black-gradient-2 p-1 flex flex-col items-center mb-10`}
    >
      <img
        src={image}
        alt=""
        className="w-[250px] h-[300px] object-cover rounded-[30px] transition-all duration-500 hover:opacity-90 pt-2"
      />

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="mt-1 text-md text-center font-bold text-white w-full">
            {domainName}
            {tld}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col">
              {/* <p className="bg-slate-600 text-sm p-1 rounded-md cursor-text font-bold">
                Token ID: 0x00000
              </p> */}
              <button className="bg-gray-400 text-sm p-1 rounded-md font-bold mt-1">
                <a
                  target="_blank"
                  href={"https://sepolia-blockscout.scroll.io/tx/" + tldAddress}
                >
                  Contract Address: {formatCard(tldAddress)}...
                </a>
              </button>
              <button
                className=" transition-all duration-500 hover:opacity-80  right-0 mt-2 text-white bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm ml-2  py-2 "
                onClick={openTransfer}
              >
                Transfer Domain
              </button>
              <button
                className=" transition-all duration-500 hover:opacity-80  right-0 mt-2 text-white bg-slate-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm ml-2  py-2 "
                onClick={openUpdate}
              >
                Update Metadata
              </button>
            </div>
            <ToastContainer autoClose={6000} />
          </div>
          <UpdateMetadata
            domainName={domainName}
            tld={tld}
            openMintModal={openMintModal}
            handleOnClose={handleMintOnClose}
          />
          <TransferDomain
            domainName={domainName}
            tld={tld}
            openMintModal={openTransferModal}
            handleOnClose={handleTransferOnClose}
          />
          <div className="p-3" />
        </div>
      </div>
    </div>
  );
};

export default DomainCard;
