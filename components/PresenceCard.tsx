"use client";

import { FaClock, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import Card from "./Card";
import { useLanyard } from "react-use-lanyard";
import { parse } from "path";

export default function PresenceCard() {

  const {loading, status} = useLanyard({
    userId: "165170547192233985",
    socket: true,
  })

  if (loading) {
    return (
      <Card colSpan={3} className="p-4 relative overflow-hidden items-center flex">
        <div className="flex justify-between items-start leading-none w-full animate-pulse">
          <div className="flex items-start gap-4 w-full">
            <div className="rounded-md border-2 border-neutral-700 bg-neutral-800 w-[80px] h-[80px]" />
            <div className="rounded-full border-2 border-neutral-700 bg-neutral-800 w-[30px] h-[30px] absolute top-[84px] left-[72px]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-neutral-800 rounded" />
              <div className="h-4 w-48 bg-neutral-800 rounded" />
              <div className="h-3 w-36 bg-neutral-800 rounded" />
              <div className="h-3 w-24 bg-neutral-800 rounded" />
            </div>
          </div>
          <div className="text-neutral-400 absolute top-4 right-4">
            <FaDiscord size={20} />
          </div>
        </div>
      </Card>
    );
  }

  const activities = status!.activities;
  const firstActivity = activities[1];
  console.log(status);

  const presenceTypes = ["Playing", "Streaming", "Listening", "Watching", "Custom", "Competing"];

  function parseImageUrl(imageString: string | undefined): string {
    if (!imageString) return "/placeholder.png";
    const parts = imageString.split("/");
    const httpsIndex = parts.indexOf("https");
    if (httpsIndex === -1 || httpsIndex === parts.length - 1) return "/placeholder.png";
    const rest = parts.slice(httpsIndex + 1).join("/");
    return `https://${rest}`;
  }

  return (
    <Card colSpan={3} className="p-4 relative overflow-hidden items-center flex">
      <div className="flex justify-between items-start leading-none w-full">
        <div className="flex items-start gap-4">
          <Image
            src={
              firstActivity
                ? parseImageUrl(firstActivity.assets?.large_image)
                : "/placeholder.png"
            }
            alt="discord presence large"
            width={80}
            height={80}
            className="rounded-md border-2 border-neutral-700 flex-shrink-0"
          />
          <Image
            src={
              firstActivity
                ? parseImageUrl(firstActivity.assets?.small_image)
                : "/placeholder.png"
            }
            alt="discord presence small"
            width={30}
            height={30}
            className="rounded-full border-2 border-neutral-700 absolute top-[84px] left-[72px]"
          />
          <div>
            <p className="text-neutral-400 text-xs mb-1">
              {firstActivity ? presenceTypes[firstActivity.type] : "—"} on {firstActivity ? firstActivity.name : "—"}
            </p>
            <h4 className="text-white font-semibold">
              {firstActivity ? firstActivity.details : "—"}
            </h4>
            <p className="text-neutral-400 text-sm">
              {firstActivity ? firstActivity.state : "—"}
            </p>
            <p className="text-neutral-500 text-sm">
              <FaClock className="inline mr-1" />
              {firstActivity ? firstActivity.timestamps?.start
                ? `since ${new Date(firstActivity.timestamps.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                : ""
                : "—"}
            </p>
          </div>
        </div>
        <button className="text-neutral-400 absolute top-4 right-4 hover:text-white" aria-label="Open Discord">
          <FaDiscord size={20} />
        </button>
      </div>
    </Card>
  );
}