import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const ContractData = () => {
  const { address } = useAccount();
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  const { data: currentGreeting, isLoading: isGreetingLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { data: currentVoting, isLoading: isVotingLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "voting",
  });

  // useScaffoldEventSubscriber({
  //   contractName: "YourContract",
  //   eventName: "GreetingChange",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { greetingSetter, value, premium, newGreeting } = log.args;
  //       console.log("📡 GreetingChange event", greetingSetter, value, premium, newGreeting);
  //     });
  //   },
  // });

  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "VotingChange",
    listener: logs => {
      logs.map(log => {
        const { votingSetter, value, premium, newVoting } = log.args;
        console.log("📡 VotingChange event", votingSetter, value, premium, newVoting);
      });
    },
  });

  // const {
  //   data: myGreetingChangeEvents,
  //   isLoading: isLoadingEvents,
  //   error: errorReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "YourContract",
  //   eventName: "GreetingChange",
  //   fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
  //   filters: { greetingSetter: address },
  //   blockData: true,
  // });

  const {
    data: myVotingChangeEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "VotingChange",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    filters: { votingSetter: address },
    blockData: true,
  });

  // console.log("Events:", isLoadingEvents, errorReadingEvents, myGreetingChangeEvents);
  console.log("Events:", isLoadingEvents, errorReadingEvents, myVotingChangeEvents);

  const { data: yourContract } = useScaffoldContract({ contractName: "YourContract" });
  console.log("yourContract: ", yourContract);

  const { showAnimation } = useAnimationConfig(totalCounter);

  //const showTransition = transitionEnabled && !!currentGreeting && !isGreetingLoading;

  const showTransition = transitionEnabled && !!currentVoting && !isVotingLoading;

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
  }, [transitionEnabled, containerRef, greetingRef]);

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        <div className="flex justify-between w-full">
          <div className="text-2xl font-bold text-primary">DAO Report</div>

          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border border-primary flex">Total count</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {totalCounter?.toString() || "0"}
            </div>
          </div>
        </div>

        <div className="mt-3 border border-primary bg-neutral rounded-3xl text-secondary  overflow-hidden whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
          
          <div className="text-2xl font-bold text-primary">{currentVoting}</div> <br/>
          
          <div className="relative overflow-x-hidden" ref={containerRef}>

            <div className="text-3xl text-primary">{currentGreeting}</div>

            <div className="text-3xl text-primary">{currentVoting}</div>

          </div>
        </div>


      </div>
    </div>
  );
};
