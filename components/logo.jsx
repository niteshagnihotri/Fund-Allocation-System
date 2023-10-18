import Link from "next/link";
import React from "react";
import { RiRefund2Fill } from "react-icons/ri";

export const Logo = () => {
  return (
    <Link href="/" className="text-xl font-semibold flex items-center">
      secure<span className="text-primary text-2xl">Fund</span>{" "}
      <RiRefund2Fill className="rotate-12 text-primary" />
    </Link>
  );
};
