import { useContext, useEffect } from "react";
//import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";
import Buttons from "./components/Buttons";
import SetPomodoro from "./components/SetPomodoro";
import CountdownAnimation from "./components/CountDownAniamtion";
import { SettingsContext } from "./context/SettingsContext";

function App() {
  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn,
  } = useContext(SettingsContext);

  useEffect(() => {
    updateExecute(executing);
  }, [updateExecute, executing, startAnimate]);

  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <small>Be productive the right way</small>
      {pomodoro === 0 ? (
        <SetPomodoro />
      ) : (
        <>
          <ul className="labels">
            <li>
              <Buttons
                title="work"
                activeClass={
                  executing.active === "work" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("work")}
              />
            </li>
            <li>
              <Buttons
                title="Short Break"
                activeClass={
                  executing.active === "short" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("short")}
              />
            </li>
            <li>
              <Buttons
                title="Long Break"
                activeClass={
                  executing.active === "long" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("long")}
              />
            </li>
          </ul>
          <Buttons title="Settings" _callback={SettingsBtn} />
          <div className="time-container">
            <div className="time-wrapper">
              <CountdownAnimation
                key={pomodoro}
                timer={pomodoro}
                animate={startAnimate}
              >
                {children}
              </CountdownAnimation>
            </div>
          </div>
          <div className="button-wrapper">
            <Buttons
              title="Start"
              className={startAnimate ? "active" : undefined}
              _callback={startTimer}
            />
            <Buttons
              title="Pause"
              className={startAnimate ? "active" : undefined}
              _callback={pauseTimer}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
