import Decisions from "@/components/game/Decisions";
import Events from "@/components/game/Events";
import States from "@/components/game/States";
import Summary from "@/components/game/Summary";

export default function Dashboard() {
  return (
    <main className="mx-auto grid w-full max-w-[1600px] gap-5 px-6 py-5 xl:grid-cols-[360px_minmax(0,1fr)_420px]">
      <States />
      <section className="flex min-w-0 flex-col gap-5">
        <Events />
        <Summary />
      </section>
      <Decisions />
    </main>
  );
}
