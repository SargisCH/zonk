import { ReactNode } from "react";
import Dice from "./DiceSelected";

const DiceWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-[50px] h-[50px] flex">{children}</div>;
};

export default function RuleSidebar() {
  return (
    <div className="w-[350px] px-4 py-4 border-4 bg-linear-to-b from-violet-grad-from to-violet-grad-to row-gap-8">
      <p className="text-white text-center">Points</p>
      <div className="flex justify-between items-center">
        <DiceWrapper>
          <Dice dice={1} />
        </DiceWrapper>
        <span className="text-white"> 100 </span>
      </div>
      <div className="flex justify-between items-center">
        <DiceWrapper>
          <Dice dice={5} />
        </DiceWrapper>
        <span className="text-white"> 50 </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <DiceWrapper>
            <Dice dice={1} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={1} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={1} />
          </DiceWrapper>
        </div>
        <span className="text-white"> 1000 </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
        </div>
        <span className="text-white"> 200 </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <DiceWrapper>
            <Dice dice={3} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={3} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={3} />
          </DiceWrapper>
        </div>
        <span className="text-white"> 300 </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <DiceWrapper>
            <Dice dice={4} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={4} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={4} />
          </DiceWrapper>
        </div>
        <span className="text-white"> 400 </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <DiceWrapper>
            <Dice dice={5} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={5} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={5} />
          </DiceWrapper>
        </div>
        <span className="text-white"> 500 </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <DiceWrapper>
            <Dice dice={6} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={6} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={6} />
          </DiceWrapper>
        </div>
        <span className="text-white"> 600 </span>
      </div>
      <div>
        <div className="flex">
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
        </div>
        <div className="text-white text-right"> 200 + 200 + ... </div>
      </div>
      <div>
        <div className="flex">
          <DiceWrapper>
            <Dice dice={1} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={1} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={3} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={3} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={6} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={6} />
          </DiceWrapper>
        </div>
        <div className="text-white text-right">3 pairs - 750 </div>
      </div>
      <div>
        <div className="flex">
          <DiceWrapper>
            <Dice dice={1} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={2} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={3} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={4} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={5} />
          </DiceWrapper>
          <DiceWrapper>
            <Dice dice={6} />
          </DiceWrapper>
        </div>
        <div className="text-white text-right">street - 1500 </div>
      </div>
    </div>
  );
}
