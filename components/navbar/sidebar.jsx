import React from "react";
import { BiArrowToRight, BiHomeAlt2, BiRegistered } from "react-icons/bi";
import useStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import {MdOutlineFindInPage, MdOutlineRequestPage} from 'react-icons/md';
import {VscGitPullRequestGoToChanges} from 'react-icons/vsc';
import {TbTransfer} from 'react-icons/tb';
import {AiOutlineTransaction} from 'react-icons/ai';

const Sidebar = () => {
  const logoutStore = useStore((state) => state.logout);
  const userStore = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, []);

  return (
    <div className="py-6 bg-white h-full">
      <div className="flex flex-col h-full items-center justify-between text-center">
        <Logo />

        <div className="flex flex-col grow-[0.7] justify-evenly text-left text-sm ">
          {/* //////////////////////////// user nav //////////////////////////// */}
          {userStore && userStore.role === "user" && (
            <>
              <Link
                href="/"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500 "
              >
               <BiHomeAlt2 className="mr-2"/> Home
              </Link>
              <Link
                href="/users/requests/create"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500 "
              >
               <MdOutlineRequestPage className="mr-2"/> Request Funds
              </Link>
              <Link
                href="/users/installment/create"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500 "
              >
              <VscGitPullRequestGoToChanges className="mr-2"/>   Request Installments
              </Link>
              <Link
                href="/users/requests/status"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500 "
              >
              <MdOutlineFindInPage className="mr-2"/>  Track Request
              </Link>
              <Link
                href="/transfer"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500 "
              >
                <TbTransfer className="mr-2"/>  Transfer Funds
              </Link>
            </>
          )}

          {/* //////////////////////////// admin nav //////////////////////////// */}
          {userStore && userStore.role === "admin" && (
            <>
              <Link
                href="/"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500"
              >
              <BiHomeAlt2 className="mr-2"/>  Home
              </Link>
              <Link
                href="/"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500"
              >
              <MdOutlineRequestPage className="mr-2"/>   Requests
              </Link>
              <Link
                href="/admin/installments"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500"
              >
              <VscGitPullRequestGoToChanges className="mr-2"/>   Installments
              </Link>
              <Link
                href="/admin/findrequest"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500"
              >
              <MdOutlineFindInPage className="mr-2"/>   Find Request
              </Link>
              <Link
                href="/transfer"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500"
              >
              <TbTransfer className="mr-2"/>   Transfer Funds
              </Link>
              <Link
                href="/admin/transactions"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500"
              >
              <AiOutlineTransaction className="mr-2"/>   Transactions
              </Link>
              <Link
                href="/admin/register"
                className="font-medium text-gray-900 cursor-pointer flex items-center hover:text-slate-500"
              >
              <BiRegistered className="mr-2"/>   Register User
              </Link>
            </>
          )}
        </div>
        {/* <div className="flex "> */}
        {userStore && userStore ? (
          <button
            type="button"
            onClick={() => {
              logoutStore();
              router.push("/login");
            }}
            className="flex rounded-sm px-10 py-1 border shadow-sm border-primary text-primary font-semibold text-sm"
          >
            Logout <BiArrowToRight className="ml-1 text-lg" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex rounded-sm px-10 py-1 border hover:bg-primary hover:text-white transition-all delay-200 duration-500 shadow-sm border-primary text-primary font-semibold text-sm"
          >
            Login <BiArrowToRight className="ml-1 text-lg" />
          </button>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
