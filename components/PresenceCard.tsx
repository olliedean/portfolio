"use client";

import { FaClock, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import Card from "./Card";
import { useLanyard } from "react-use-lanyard";
import moment from "moment";
import { useEffect, useState } from "react";

export default function PresenceCard() {

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

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

  if (!status) {
    return null;
  }

  const activities = status?.activities ?? [];
  let firstActivity = activities.find((a) => a && a.assets) ?? activities[0];

  if(!firstActivity) {
    firstActivity = {
      state: "",
      id: "",
      name: "",
      type: 0,
      created_at: 0,
    };
  }

  // console.log(status);

  const presenceTypes = ["Playing", "Streaming", "Listening", "Watching", "Custom", "Competing"];

  type DurationResult =
    | { type: "bar"; elapsed: string; percent: number; total: string }
    | { type: "text"; value: string };

  function parseImageUrl(imageString: string | undefined): string {
    if (!imageString) return "/placeholder.jpg";

    if (/^https?:\/\//.test(imageString)) return imageString;

    if (imageString.startsWith("mp:external/")) {
      const after = imageString.slice("mp:external/".length);

      if (/^https?:\/\//.test(after)) return after;

      const httpsSeg = after.indexOf("/https/");
      if (httpsSeg !== -1) {
      return "https://" + after.slice(httpsSeg + "/https/".length);
      }

      const httpSeg = after.indexOf("/http/");
      if (httpSeg !== -1) {
      return "http://" + after.slice(httpSeg + "/http/".length);
      }

      return "/placeholder.jpg";
    }

    if (imageString.includes(":")) {
      const [appId, imageId] = imageString.split(":");
      if (appId && imageId && /^\d+$/.test(appId)) {
        return `https://cdn.discordapp.com/app-assets/${appId}/${imageId}.png?size=160`;
      }
    }

    const appId = firstActivity?.application_id;
    if (appId) {
      return `https://cdn.discordapp.com/app-assets/${appId}/${imageString}.png?size=160`;
    }

    return "/placeholder.jpg";
  }

  function formatMs(ms: number): string {
    const duration = moment.duration(ms);
    const totalHours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const pad = (n: number) => String(n).padStart(2, "0");

    if (totalHours > 0) {
      return `${totalHours}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${pad(minutes)}:${pad(seconds)}`;
  }

  function formatDuration(value: { start?: number; end?: number } | number | undefined): DurationResult {
    if (typeof value === "number") {
      return { type: "text", value: formatMs(Math.max(0, value)) };
    }

    if (value && typeof value === "object") {
      const { start, end } = value;

      if (start && end && end > start) {
        const total = end - start;
        const elapsed = Math.min(now - start, total);
        const percent = (elapsed / total) * 100;
        return { type: "bar", elapsed: formatMs(elapsed), percent, total: formatMs(total) };
      }

      if (start) {
        const elapsed = now - start;
        return { type: "text", value: formatMs(Math.max(0, elapsed)) };
      }
    }

    return { type: "text", value: "—" };
  }

  const renderDuration = () => {
    const parsed = formatDuration(firstActivity?.timestamps);
    if (parsed.type === "bar") {
      return (
        <div className="flex w-full items-center gap-2">
          <span>{parsed.elapsed}</span>
          <div className="bg-neutral-500 h-1 flex-1 rounded-sm">
            <div className="bg-neutral-400 h-1 rounded-sm" style={{ width: `${parsed.percent}%` }} />
          </div>
          <span>{parsed.total}</span>
        </div>
      );
    }

    return parsed.value;
  };

  return (
    <Card colSpan={3} className="p-4 relative overflow-hidden items-center flex">
      <div className="flex justify-between items-start leading-none w-full">
        <div className="flex items-center gap-4 w-full">
          <Image
            src={
              firstActivity.assets?.large_image
                ? parseImageUrl(firstActivity.assets?.large_image)
                : "/placeholder.jpg"
            }
            alt="discord presence large"
            width={80}
            height={80}
            className="rounded-md border-2 border-neutral-700 flex-shrink-0"
          />
          { firstActivity.assets?.small_image && (
          <Image
            src={
              firstActivity.assets
                ? parseImageUrl(firstActivity.assets?.small_image)
                : "/placeholder.jpg"
            }
            alt="discord presence small"
            width={30}
            height={30}
            className="rounded-full border-2 border-neutral-700 absolute top-[84px] left-[72px]"
          />
          ) }
          <div className="flex-1">
            <p className="text-neutral-400 text-xs mb-1">
              {firstActivity ? presenceTypes[firstActivity.type] : "—"} on {firstActivity.name ? firstActivity.name : "—"}
            </p>
            <h4 className="text-white font-semibold">
                {firstActivity ? (firstActivity.details && firstActivity.details.trim() !== "" ? firstActivity.details : "not up to anything") : "-"}
            </h4>
            <p className="text-neutral-400 text-sm">
              {firstActivity ? firstActivity.state : "—"}
            </p>
            <div className="text-neutral-500 text-sm flex items-center">
              <FaClock className="inline mr-1" />
              <div className="flex w-3/4 items-center gap-1">
                {renderDuration()}
              </div>
            </div>
          </div>
        </div>
        <button className="text-neutral-400 absolute top-4 right-4 hover:text-white" aria-label="Open Discord">
          <FaDiscord size={20} />
        </button>
      </div>
    </Card>
  );
}