"use client";
import React from "react";
import BackButton from "./inputs/backbutton";

export const PageHeader = ({ text = "" }) => {
  return (
    <div>
      <BackButton />
      {text !== "" && (
        <h1 className="text-xl font-semibold text-center">{text}</h1>
      )}
    </div>
  );
};
