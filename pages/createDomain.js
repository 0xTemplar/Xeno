"use client";

import CreateHeader from "@/components/CreateHeader";
import ProfileNavbar from "@/components/ProfileNavbar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import DomainTypeCard from "@/components/DomainTypeCard";

const createDomain = () => {
  return (
    <div className="bg-black-gradient h-full">
      <div className="flex">
        <Sidebar />
        <ProfileNavbar />
      </div>
      <div className="pb-20">
        <CreateHeader />

        <DomainTypeCard />
      </div>
    </div>
  );
};

export default createDomain;
