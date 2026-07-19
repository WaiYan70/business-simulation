import Costs from "@/components/game/Costs";
import Decisions from "@/components/game/Decisions";
import Events from "@/components/game/Events";
import IncomeStatement from "@/components/game/IncomeStatement";
import Stats from "@/components/game/States";
import Summary from "@/components/game/Summary";

export default function Dashboard() {
  return (
    <main className="mx-auto grid w-full max-w-[1600px] gap-5 px-6 py-5 xl:grid-cols-[360px_minmax(0,1fr)_420px]">
      <div className="flex flex-col gap-5">
        <Stats />
        <Costs />
        <IncomeStatement/>
      </div>
      <div className="flex min-w-0 flex-col gap-5">
        <Events />
        <Summary />
      </div>
      <Decisions />
    </main>
  );
}
