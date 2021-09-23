import { FaPause, FaPlay } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Play({ mediation, time }) {
  const [playing, setPlaying] = useState(false);
  const [complete, setComplete] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState(null);
  const router = useRouter();
  const song = useRef(null);
  const video = useRef(null);
  const movingOutline = useRef(null);

  const soundURL = `/sounds/${mediation}.wav`;
  const videoURL = `/videos/${mediation}.mp4`;

  useEffect(() => {
    if (movingOutline) {
      const outlineLength = movingOutline.current.getTotalLength();
      movingOutline.current.style.strokeDashoffset = outlineLength;
      movingOutline.current.style.strokeDasharray = outlineLength;

      if (song) {
        song.current.ontimeupdate = () => {
          if (song.current.currentTime !== 0) {
            let currentTime = song.current.currentTime;
            let elapsed = time - currentTime;
            let seconds = Math.floor(elapsed % 60).toLocaleString(undefined, {
              minimumIntegerDigits: 2,
            });
            let minutes = Math.floor(elapsed / 60).toLocaleString(undefined, {
              minimumIntegerDigits: 2,
            });
            setTimeDisplay(`${minutes}:${seconds}`);

            let progress = outlineLength - (currentTime / time) * outlineLength;
            movingOutline.current.style.strokeDashoffset = progress;

            if (currentTime >= time) {
              song.current.pause();
              song.current.currentTime = 0;
              video.current.pause();
              setPlaying(false);
              setComplete(true);
              video.current.style.opacity = 0;
            }
          }
        };
      }
    }
  }, [time]);

  const checkPlaying = () => {
    if (!playing) {
      song.current.play();
      video.current.play();
      video.current.style.opacity = 0.25;
    } else {
      song.current.pause();
      video.current.pause();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio className="song" loop ref={song}>
        <source src={soundURL} />
      </audio>

      <video muted loop ref={video}>
        <source src={videoURL} type="video/mp4" />
      </video>

      {complete ? (
        <main>
          <div className="container">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.6 207.8">
                <g data-name="Layer 2">
                  <path
                    d="M142.35 207.8a24.45 24.45 0 0 1-11.21-2.66 25.33 25.33 0 0 1-11 2.36 37 37 0 0 1-5.09-.38c-23.06-2.93-40.87-8.87-56-18.7-17.82-11.58-31.1-28.23-39.51-49.5-5-12.87-9.72-25.59-14.85-39.67-.53-1.38-1-2.8-1.55-4.23-.41-1.16-.83-2.33-1.27-3.48L1.62 91l-.19-.61C-1.74 80.24 1 73.08 3.77 68.86l.47-.71.53-.66c2.61-3.29 8.59-8.79 19.28-8.79a23 23 0 0 1 3 .19 365.5 365.5 0 0 1 49.52 8.21c5.62-9.33 11.55-18.36 16.53-25.93l1.9-2.85c5.53-8.42 11.25-17.12 16.16-25.68l.16-.26.16-.26C116.19 4.42 123.62 0 131.85 0c8.45 0 16.38 4.89 20.79 12.79C158 22 164 31.22 169.92 40.18l.78 1.19c5.45 8.25 11.05 16.74 16.36 25.6a432.52 432.52 0 0 1 45.07-7.81h.4l1.15-.1c1.38-.13 3.24-.31 5.37-.31h.6c8.72 0 16.39 4.17 20.63 11.18a22.7 22.7 0 0 1 2 19.56l-.18.53-.2.52c-2 5-3.89 10.45-5.72 15.68l-1.82 5.19c-4.89 14.16-9.95 28.8-17.9 42.93-15.33 27.3-40.9 44.45-76 51q-5.65 1-11.2 1.7h-.12c-.38.06-.82.16-1.37.27a24.58 24.58 0 0 1-5.42.49Z"
                    fill="transparent"
                  />
                  <path
                    d="M243.21 80.31a3.88 3.88 0 0 0-3.56-1.61h-.6a34.12 34.12 0 0 0-3.45.22l-1 .09c-20.31 2.55-36.75 5.61-51.72 9.62a12.82 12.82 0 0 1-2.85.47c-3 0-4.41-2-5.53-3.89-6.3-11.32-13.5-22.27-20.5-32.86l-.78-1.2c-6.07-9.24-12.35-18.8-18-28.52-.87-1.63-2.16-2.63-3.37-2.63s-2.32.89-3.37 2.6c-5.21 9.08-11.1 18-16.79 26.69l-1.88 2.86c-6.21 9.45-13.94 21.21-20.44 32.67-1.15 2.12-2.76 4.28-6 4.28a13.69 13.69 0 0 1-3-.47 349.09 349.09 0 0 0-55.22-9.83 2.59 2.59 0 0 1-.41 0 4.92 4.92 0 0 0-.69-.06c-1.21 0-2.81.2-3.64 1.24-.57.87-.55 2.34.1 4.42.5 1.29 1 2.61 1.44 3.92s1 2.67 1.46 4c5.11 14 9.75 26.68 14.71 39.33C45 148.9 55.66 162.38 69.9 171.64c12.58 8.15 27.77 13.12 47.81 15.65a16.93 16.93 0 0 0 2.44.21c1.64 0 3.43-.31 4.23-2.54 1-2.64-.25-3.8-3.4-5.8l-.23-.13c-10.7-7.13-18.52-14.08-24.61-21.84-9.33-12.08-13.06-24.73-11.4-38.68C86 107.27 90.22 96 97.6 84c5.54-9 11.38-18 17-26.77l.46-.72c1.41-2.23 2.86-4.46 4.31-6.71 2.1-3.24 4.26-6.59 6.34-9.9l.15-.2c2.7-4.29 3.86-6 5.66-6s3.13 2 5.74 6.41c4.55 7.65 9.69 15.39 14.12 21.94l1.24 1.88c4.88 7.35 9.93 15 14.43 22.78.88 1.48 1.68 3.21 1 4.82-.59 1.46-2 2.16-4.07 2.82A138.12 138.12 0 0 0 135 107a6.12 6.12 0 0 1-7.09-.09 129.23 129.23 0 0 0-22-10.19 6.63 6.63 0 0 0-2-.45 2.88 2.88 0 0 0-2.73 1.92c-.37.89-1.36 3.28 2 4.89.89.4 1.88.79 2.93 1.22.24.09.45.19.66.28l.74.32a97.44 97.44 0 0 1 15.64 7.61l1.43.92-1.88 1.8c-3.93 3.82-7.64 7.44-10.28 11.94-5.88 10.29-3.35 23 5.89 29.52a22.56 22.56 0 0 0 13 4.18 21.66 21.66 0 0 0 16.69-7.73c7.34-8.81 6.73-22.56-1.3-30.58a4.19 4.19 0 0 0-3-1.56 3.42 3.42 0 0 0-2.13.82c-1.57 1.25-1.76 2.67-.61 4.64.39.57.78 1.16 1.17 1.84l.06.09a30.85 30.85 0 0 1 2.13 3.48A15 15 0 0 1 131.15 154a15.05 15.05 0 0 1-13.6-21.47c2.13-4.46 5.45-8.45 10.43-12.56 6.39-5.22 14-9.63 24-13.85C177.2 95.54 203.42 90.67 228 87a9.08 9.08 0 0 1 1.54-.09 3.15 3.15 0 0 1 2.68 1.09c.81 1.17.34 2.71-.21 4.18-.72 1.91-1.43 3.85-2.15 5.79-1.08 2.94-2.16 5.87-3.25 8.71l-.6 1.62c-2.51 6.8-5.11 13.83-7.79 20.76-6 15.16-14.35 26.47-25.56 34.56-9.29 6.69-19.37 11.09-31.73 13.83l-4.35 1 3.1-3.22c1.29-1.39 2.5-2.6 3.67-3.77 2.51-2.51 4.37-4.5 6.05-6.45 14-16.15 18.8-33.54 14.63-53.16-.76-3.69-1.67-5-3.48-5a4.47 4.47 0 0 0-1.19.12 3.05 3.05 0 0 0-2.15 1.15c-.6.9-.61 2.29 0 4.94 3.33 15.68 0 30.38-10 43.69-6.3 8.4-14.46 15.63-26.46 23.47C138 182 138 183.57 138.4 185a3.72 3.72 0 0 0 3.95 2.78 4.76 4.76 0 0 0 1.21-.12c1.47-.3 2.44-.49 3.3-.59 3.3-.4 6.65-.91 10-1.51 29.38-5.45 49.72-18.89 62.19-41.09 7.07-12.57 11.83-26.35 16.43-39.67l.34-1 1.49-4.24c1.9-5.43 3.86-11 6-16.47a3.25 3.25 0 0 0-.1-2.78Zm-160.8 20.74c-9.93 26.64-4.09 49.66 17.84 70.37a1.52 1.52 0 0 0 .24.19l.33.36a4.24 4.24 0 0 1 1.83 3.1v.78l-.68.4a3.81 3.81 0 0 1-2.07.55 6.12 6.12 0 0 1-2.28-.53l-.33-.13a4.3 4.3 0 0 1-.65-.24l-.18-.06c-24.77-6.91-42.14-22.79-51.63-47.2-1.87-4.86-3.76-9.9-5.59-14.78q-1.22-3.24-2.41-6.41-1-2.69-2-5.43c-1.23-3.34-2.5-6.8-3.8-10.19-.74-1.84-.77-3.1-.11-4.06a3.09 3.09 0 0 1 2.68-1.17 10.52 10.52 0 0 1 1.36.15h.29a439.45 439.45 0 0 1 43.39 8.48h.23c1.56.39 2.89.84 3.53 2a4.81 4.81 0 0 1 .01 3.82Z"
                    fill="#6f6fad"
                  />
                </g>
              </svg>
            </div>
            <h1>Well Done</h1>
            <p>
              You have taken a step closer <br /> to better mental health.
            </p>
            <p>Meditate again.</p>
            <Link href="/">
              <a>
                <IoChevronForward />
              </a>
            </Link>
          </div>
        </main>
      ) : (
        <main>
          <div className="container">
            <h1>Be Mindful</h1>
            <svg
              className="track-outline"
              width="453"
              height="453"
              viewBox="0 0 453 453"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="226.5"
                cy="226.5"
                r="216.5"
                stroke="white"
                strokeWidth="20"
              />
            </svg>
            <svg
              className="moving-outline"
              width="453"
              height="453"
              viewBox="0 0 453 453"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="226.5"
                cy="226.5"
                r="216.5"
                stroke="#6f6fad"
                strokeWidth="22"
                ref={movingOutline}
              />
            </svg>
            <a href="#" onClick={checkPlaying}>
              <div>{playing ? <FaPause /> : <FaPlay />}</div>
            </a>
            <h3 className="time-display">{timeDisplay}</h3>
          </div>
        </main>
      )}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { mediation, time } = context.query;
  return {
    props: {
      mediation,
      time,
    },
  };
};
