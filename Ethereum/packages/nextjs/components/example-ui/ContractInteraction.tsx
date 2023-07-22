import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState("");
  const [newVoting, setNewVoting] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  // const { writeAsync, isLoading } = useScaffoldContractWrite({
  //   contractName: "YourContract",
  //   functionName: "setGreeting",
  //   args: [newGreeting],
  //   value: "0.01",
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setVoting",
    args: [newVoting],
    value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });


  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);
    alert(selectedValues);
    const isChecked = e.target.checked;
    console.log(`Checkbox is ${isChecked ? "checked" : "unchecked"}`);
  }

  // const handleVote = () => {

  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  //   const selectedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);

  //   alert(selectedValues);
  //   setSelectedOptions(selectedValues);
  //   setNewVote(`Voted for ${selectedValues.join(", ")}!`);
  // };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            <span className="text-3xl">📌</span>
            <div>
              <div>
                Select a token to grow during the investment period and enter <strong>the amount of Ethereum</strong> to invest!
              </div>
              <div className="mt-2">
                Click the <strong>"vote"</strong> button to see the voting results and current status.
              </div>
            </div>
          </div>
          <button
            className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
            onClick={() => setVisible(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-3xl sm:text-4xl text-black">DAO vote!</span>

          <div className="">
            <input
              type="text"
              placeholder="Amount of Ethereum"
              className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setNewGreeting(e.target.value)}
            />

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5" onChange={handleCheckboxChange} >
            <label className="font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest flex-row-reverse">
              <input type="checkbox" name="option1" value="0" className="" />
              Ethereum
            </label>
            <label className="font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest flex-row-reverse">
              <input type="checkbox" name="option2" value="1" className="" />
              Tether USD
            </label>
            <label className="font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest flex-row-reverse">
              <input type="checkbox" name="option3" value="2" className="" />
              USD Coin
            </label>
            <label className="font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest flex-row-reverse">
              <input type="checkbox" name="option4" value="3" className="" />
              Binance USD
            </label>
          </div>

            {/* <div className="flex rounded-full border-primary">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => writeAsync()}
                >
                  {!isLoading && (
                    <>
                      Vote your choice <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div> */}

            <div className="flex rounded-full border-primary">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => writeAsync()}
                >
                  {!isLoading && (
                    <>
                      Vote your choice <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
