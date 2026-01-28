import React, { useMemo, useState } from "react";
import { quotes } from "./utils/quotes";
import { workouts } from "./workouts";
import { getFightOfTheDay } from "./fightStudy/fights";

type TabId = "home" | "workout" | "study" | "progress";

const FIGHT_DATE = new Date(new Date().getFullYear(), 2, 7, 0, 0, 0, 0); // March 7

function useCountdown(target: Date) {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(target.getTime() - now.getTime(), 0);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

const HomeScreen: React.FC = () => {
  const countdown = useCountdown(FIGHT_DATE);
  const quote = useMemo(getRandomQuote, []);

  const [completed, setCompleted] = React.useState<Record<string, boolean>>({
    pullups: false,
    situps: false,
    squats: false
  });

  const handleComplete = (key: keyof typeof completed) => {
    if (completed[key]) return;
    setCompleted(prev => ({ ...prev, [key]: true }));
  };

  const allDone = Object.values(completed).every(Boolean);

  const [quoteText, quoteAttrib] = useMemo(() => {
    const parts = quote.split("—");
    if (parts.length === 2) {
      return [parts[0].trim(), parts[1].trim()];
    }
    return [quote, ""];
  }, [quote]);

  return (
    <div className="screen">
      <div>
        <div className="title">THE ROAD TO 1-0</div>
      </div>

      <div className="card">
        <div className="countdown-label">Countdown to battle</div>
        <div className="countdown-row">
          <div className="segment">
            <span className="segment-value">{countdown.days}</span>
            <span className="segment-label">Days</span>
          </div>
          <div className="segment">
            <span className="segment-value">{countdown.hours}</span>
            <span className="segment-label">Hours</span>
          </div>
          <div className="segment">
            <span className="segment-value">{countdown.minutes}</span>
            <span className="segment-label">Min</span>
          </div>
          <div className="segment">
            <span className="segment-value">{countdown.seconds}</span>
            <span className="segment-label">Sec</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">Quote of the day</div>
        <p className="quote">
          {quoteText}
          {quoteAttrib && <span className="quote-attrib"> — {quoteAttrib}</span>}
        </p>
      </div>

      <div className="card">
        <div className="section-title">Daily non-negotiables</div>
        <ul className="non-neg-list">
          <li className="non-neg-item">
            <button
              className="non-neg-circle"
              onClick={() => handleComplete("pullups")}
            >
              {completed.pullups ? "✓" : ""}
            </button>
            <span
              className={
                "non-neg-label" + (completed.pullups ? " completed" : "")
              }
            >
              100 pull ups
            </span>
          </li>
          <li className="non-neg-item">
            <button
              className="non-neg-circle"
              onClick={() => handleComplete("situps")}
            >
              {completed.situps ? "✓" : ""}
            </button>
            <span
              className={
                "non-neg-label" + (completed.situps ? " completed" : "")
              }
            >
              100 sit ups
            </span>
          </li>
          <li className="non-neg-item">
            <button
              className="non-neg-circle"
              onClick={() => handleComplete("squats")}
            >
              {completed.squats ? "✓" : ""}
            </button>
            <span
              className={
                "non-neg-label" + (completed.squats ? " completed" : "")
              }
            >
              100 squats
            </span>
          </li>
        </ul>
        {allDone && (
          <p className="muted" style={{ marginTop: 10 }}>
            Well done brother, let&apos;s keep grinding. Stay hard!
          </p>
        )}
      </div>
    </div>
  );
};

const WorkoutScreen: React.FC = () => {
  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const phase = workouts.phase1FoundationOfViolence;
  const schedule: any = phase.schedule;
  const dayData = schedule[weekday] ?? schedule.MONDAY;

  return (
    <div className="screen">
      <div className="title">{phase.phase}</div>
      <div className="card">
        <div className="section-title">{weekday}</div>
        <p className="muted">{dayData.title}</p>
        <p className="muted" style={{ marginTop: 4 }}>
          {dayData.rounds}
        </p>
        <ul className="non-neg-list" style={{ marginTop: 12 }}>
          {dayData.workout?.map((item: string, idx: number) => (
            <li key={idx} className="non-neg-item">
              <span className="non-neg-label">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FightStudyScreen: React.FC = () => {
  const fight = getFightOfTheDay();

  return (
    <div className="screen">
      <div className="title">Fight Study</div>
      <div className="card">
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            cursor: "pointer",
            marginBottom: 12
          }}
          onClick={() => window.open(fight.youtubeUrl, "_blank")}
        >
          <img
            src={fight.thumbnailUrl}
            alt={fight.title}
            style={{ width: "100%", display: "block" }}
          />
        </div>
        <h2 style={{ fontSize: 18, margin: "0 0 4px" }}>{fight.title}</h2>
        <p className="muted" style={{ marginBottom: 12 }}>
          Focus for today
        </p>
        <ul className="non-neg-list">
          {fight.keyTakeaways.map((point, idx) => (
            <li key={idx} className="non-neg-item">
              <span className="non-neg-label">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ProgressScreen: React.FC = () => {
  return (
    <div className="screen">
      <div className="title">Progress</div>
      <div className="card">
        <p className="muted">
          Simple web version of the journey. For now this shows static copy – we
          can wire in localStorage-backed stats next.
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [tab, setTab] = useState<TabId>("home");

  let content: React.ReactNode;
  if (tab === "home") content = <HomeScreen />;
  else if (tab === "workout") content = <WorkoutScreen />;
  else if (tab === "study") content = <FightStudyScreen />;
  else content = <ProgressScreen />;

  return (
    <div className="app-shell">
      {content}
      <nav className="bottom-nav">
        <button
          className={"nav-item" + (tab === "home" ? " active" : "")}
          onClick={() => setTab("home")}
        >
          <span className="nav-item-icon">🏠</span>
          <span>Home</span>
        </button>
        <button
          className={"nav-item" + (tab === "workout" ? " active" : "")}
          onClick={() => setTab("workout")}
        >
          <span className="nav-item-icon">🔥</span>
          <span>Workout</span>
        </button>
        <button
          className={"nav-item" + (tab === "study" ? " active" : "")}
          onClick={() => setTab("study")}
        >
          <span className="nav-item-icon">🎯</span>
          <span>Study</span>
        </button>
        <button
          className={"nav-item" + (tab === "progress" ? " active" : "")}
          onClick={() => setTab("progress")}
        >
          <span className="nav-item-icon">📈</span>
          <span>Progress</span>
        </button>
      </nav>
    </div>
  );
};

export default App;

