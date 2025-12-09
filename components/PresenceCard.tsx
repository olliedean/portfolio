import { FaDiscord } from "react-icons/fa";
import Image from "next/image";
import Card from "./Card";

export default function MusicCard() {
  return (
    <Card colSpan={3} className="p-4 relative overflow-hidden items-center flex">
      <div className="flex justify-between items-start leading-none">
        <div className="flex items-start gap-4">
          <Image
            src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cc/93/af/cc93afb0-6091-416a-3de1-15704c982d9a/5026854129983.jpg/512x512bb.jpg"
            alt="discord presence large"
            width={80}
            height={80}
            className="rounded-md border-2 border-neutral-700 flex-shrink-0"
          />
          <Image
            src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cc/93/af/cc93afb0-6091-416a-3de1-15704c982d9a/5026854129983.jpg/512x512bb.jpg"
            alt="discord presence small"
            width={30}
            height={30}
            className="rounded-full border-2 border-neutral-700 absolute top-[84px] left-[72px]"
          />
          <div>
            <p className="text-neutral-400 text-xs mb-1">Listening to Cider</p>
            <h4 className="text-white font-semibold">MISS U THE WORST</h4>
            <p className="text-neutral-400 text-sm">Aries</p>
            <p className="text-neutral-400 text-sm">GLASS JAW</p>
          </div>
        </div>
        <button className="text-neutral-400 absolute top-4 right-4 hover:text-white">
          <FaDiscord size={20} />
        </button>
      </div>
    </Card>
  );
}