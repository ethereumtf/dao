import Link from "next/link";
import type { NextPage } from "next";
import { StarIcon, CubeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">DAO s.a.r.l</span>
          </h1>
          <p className="text-center text-lg">
            <span className="block text-2xl mb-2">Optimal DAO for portfolio investments</span>
          </p>
          <p className="text-center text-lg">
            <span className="block text-2xl mb-2">Staking & Social intelligence!</span>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <StarIcon className="h-8 w-8 fill-secondary" />
              <p>
                Decentralized Autonomous Organization
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <CubeIcon className="h-8 w-8 fill-secondary" />
              <p>
                Simple and transparent investment
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ChatBubbleLeftRightIcon className="h-8 w-8 fill-secondary" />
              <p>
                Participation and incentives of members
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
