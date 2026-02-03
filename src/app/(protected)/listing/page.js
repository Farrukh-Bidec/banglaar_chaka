"use client";
import React from "react";
import MotorListingForm from "@/components/WebsiteComponents/listingforms/MotorListingForm";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <MotorListingForm mode="create" />
      </div>
    </div>
  );
};

export default Page;
