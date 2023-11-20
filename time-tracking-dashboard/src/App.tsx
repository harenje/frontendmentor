import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import workSvg from "../public/images/icon-work.svg";
import playSvg from "../public/images/icon-play.svg";
import studySvg from "../public/images/icon-study.svg";
import exerciseSvg from "../public/images/icon-exercise.svg";
import socialSvg from "../public/images/icon-social.svg";
import selfCareSvg from "../public/images/icon-self-care.svg";
import data from "./data/data.json";
import { useState } from "react";

type CardProps = {
  bgClass: string;
  imgSrc: string;
  title: string;
  hours: string;
  previousHours: string;
};

interface Timeframe {
  current: number;
  previous: number;
}

interface ActivityData {
  title: string;
  timeframes: {
    daily: Timeframe;
    weekly: Timeframe;
    monthly: Timeframe;
  };
}

const activities: ActivityData[] = data as ActivityData[];

const determineBgClass = (title: string): string => {
  const bgClasses: { [key: string]: string } = {
    Work: "bg-light-red",
    Play: "bg-soft-blue",
    Study: "bg-study-red",
    Exercise: "bg-lime-green",
    Social: "bg-violet",
    "Self Care": "bg-soft-orange",
  };
  return bgClasses[title];
};

const determineImgSrc = (title: string): string => {
  const imgSrcs: { [key: string]: string } = {
    Work: workSvg,
    Play: playSvg,
    Study: studySvg,
    Exercise: exerciseSvg,
    Social: socialSvg,
    "Self Care": selfCareSvg,
  };
  return imgSrcs[title];
};

const Card: React.FC<CardProps> = ({
  bgClass,
  imgSrc,
  title,
  hours,
  previousHours,
}) => (
  <div className={`h-full w-full ${bgClass} rounded-2xl flex flex-col`}>
    <img
      src={imgSrc}
      width={60}
      alt={`${title} icon`}
      className="self-end z-0 translate-y-3 mx-5"
    />
    <div className="z-10 bg-dark-blue h-full rounded-xl hover:bg-desaturated-blue hover:cursor-pointer flex flex-col pl-5 pt-2 justify-start">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-bold text-xl">{title}</h2>
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Button>
      </div>
      <div className="text-white flex flex-col gap-3 my-auto">
        <h2 className="font-bold text-white text-4xl lg:text-6xl">{hours}</h2>
        <span>{previousHours}</span>
      </div>
    </div>
  </div>
);

function App() {
  const [timeframe, setTimeFrame] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );

  const handleTimeframeChange = (
    newTimeframe: "daily" | "weekly" | "monthly"
  ) => {
    setTimeFrame(newTimeframe);
  };

  const isActive = (frame: string) =>
    timeframe === frame
      ? "text-white underline-offset-4 underline"
      : "text-pale-blue";

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <section className="h-3/4 w-11/12 grid md:grid-cols-4 gap-4 items-center justify-items-center">
        <div className="h-full w-full row-span-2 bg-dark-blue rounded-xl flex flex-col">
          <div className="basis-3/4 bg-blue rounded-xl flex flex-col pl-5 justify-evenly">
            <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col text-white justify-center">
              <small className="text-muted-foreground">Report for</small>
              <h1 className="text-4xl">Jeremy</h1>
              <h1 className="text-4xl">Johnson</h1>
            </div>
          </div>
          <div className="basis-1/4 flex flex-col items-start justify-center">
            <Button
              className={`text-pale-blue hover:text-white ${isActive("daily")}`}
              variant="link"
              onClick={() => handleTimeframeChange("daily")}
            >
              Daily
            </Button>
            <Button
              className={`text-pale-blue hover:text-white ${isActive(
                "weekly"
              )}`}
              variant="link"
              onClick={() => handleTimeframeChange("weekly")}
            >
              Weekly
            </Button>
            <Button
              className={`text-pale-blue hover:text-white ${isActive(
                "monthly"
              )}`}
              variant="link"
              onClick={() => handleTimeframeChange("monthly")}
            >
              Monthly
            </Button>
          </div>
        </div>
        {activities.map((item, index) => (
          <Card
            key={index}
            bgClass={determineBgClass(item.title)}
            imgSrc={determineImgSrc(item.title)}
            title={item.title}
            hours={`${item.timeframes[timeframe].current}hrs`}
            previousHours={`Last ${timeframe} - ${item.timeframes[timeframe].previous}hrs`}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
