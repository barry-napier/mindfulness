import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { useState } from "react";

export default function Create() {
  const [time, setTime] = useState(180);
  const [mediation, setMediation] = useState("sun");

  return (
    <>
      <main>
        <div className="container">
          <h1>Create</h1>
          <p>
            Select from the options below <br /> to create your perfect
            <br /> mindfulness session.
          </p>
          <div className="options">
            <div className="times">
              <div
                className={time === 180 ? "active" : ""}
                onClick={() => {
                  setTime(180);
                }}
              >
                3 Minutes
              </div>
              <div
                className={time === 300 ? "active" : ""}
                onClick={() => {
                  setTime(300);
                }}
              >
                5 Minutes
              </div>
              <div
                className={time === 480 ? "active" : ""}
                onClick={() => {
                  setTime(480);
                }}
              >
                8 Minutes
              </div>
            </div>
            <div className="meditations">
              <div
                className={mediation === "sun" ? "active" : ""}
                onClick={() => {
                  setMediation("sun");
                }}
              >
                Sunny Day
              </div>
              <div
                className={mediation === "waves" ? "active" : ""}
                onClick={() => {
                  setMediation("waves");
                }}
              >
                Cool Waves
              </div>
              <div
                className={mediation === "rain" ? "active" : ""}
                onClick={() => {
                  setMediation("rain");
                }}
              >
                Refreshing Rain
              </div>
            </div>
          </div>
          <Link href={{ pathname: "/play", query: { time, mediation } }}>
            <a>
              <IoChevronForward />
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}
