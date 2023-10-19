"use client";
import React from "react";
import useStore from "@/store/userstore";
import UserHomeComponent from "@/components/home/user.requests.component";
import AdminHomeComponent from "@/components/home/admin.requests.component";
import { useRouter } from "next/navigation";

export default function Home() {
  const userStore = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, []);

  return (
    <>
      {userStore && userStore.role === "user" ? (
        <UserHomeComponent />
      ) : (
        userStore && userStore.role === "admin" && (
          <AdminHomeComponent />
        )
      )}
    </>
  );
}
