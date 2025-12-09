import Image from "next/image";
import Card from "./Card";

export default function ProfileCard() {
  return (
    <Card colSpan={4} rowSpan={1} className="p-6 flex flex-col justify-between">
      <div className="flex items-start gap-4">
        <Image
          src="/misty.jpg"
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-md border-2 border-neutral-700"
        />
        <div className="leading-none my-auto">
          <h1 className="text-xl font-bold text-white">hey, i'm ollie dean</h1>
          <p className="text-neutral-400 mb-3">a freelance software and web developer based in the uk</p>
          <div className="flex items-center gap-2 bg-neutral-900/40 px-3 py-1 rounded-full w-max border border-neutral-700">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm">available for hire</span>
          </div>
        </div>
      </div>
    </Card>
  );
}