import { useEffect, useState } from "react";
import "./App.css";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

function App() {
  const [time, setTime] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  // const [display, setDisplay] = useState(5);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  let insec: number = parseInt(time) * 60;
  // console.log(time, insec);
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        if (insec > 0) {
          insec--;
          setMinute(Math.floor((insec / 60) % 60));
          setSecond(Math.floor(insec % 60));
          console.log(insec);
        } else {
          clearInterval(interval);
          console.log("Time's up!");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [insec, isRunning, time]);
  return (
    <>
      <div className="App">
        <div className="lg:min-h-[30rem] min-h-[25rem] lg:pt-[2rem] lg:pb-[3rem] pt-[1rem] pb-[1.5rem]  lg:w-[50%] w-[90%] rounded-[.5rem] lg:rounded-[.8rem] bg-gray-100 flex flex-col justify-around items-center">
          <p className="text-[2rem] font-600">Timer</p>
          <input
            className="lg:w-[60%] w-[90%] p-2 border-solid border-2 border-[#2c1f1f] rounded-[.5rem] bg-gray-200"
            // type="text"
            required
            placeholder="Input timer minutes here...."
            value={time}
            // value={time || 0}
            onChange={(e) => {
              setTime(e.target.value);
              const timer: string = e.target.value;
              setMinute(Math.floor(((parseInt(timer) * 60) / 60) % 60));
              setSecond(Math.floor((parseInt(timer) * 60) % 60));
            }}
          />
          <>
            <div
              className={`${
                insec < 5 ? "text-red-600" : ""
              }lg:mt-[5rem] text-[5rem]`}
            >
              {`${minute < 10 ? `0${minute}` : minute}:${
                second < 10 ? `0${second}` : second
              }`}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={() => {
                  setTime("0");
                  setMinute(0);
                  setSecond(0);
                }}
              >
                <MdRefresh />
              </button>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default App;
