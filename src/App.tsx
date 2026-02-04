import React, { useEffect, useMemo, useState } from "react";
import { quotes } from "./utils/quotes";
import { workouts } from "./workouts";
import { getFightOfTheDay } from "./fightStudy/fights";
import { getMindsetOfTheDay } from "./mindset/mindset";

type TabId = "home" | "workout" | "study" | "mindset";

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
    pushups: false,
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
        <h1 className="title">THE ROAD TO 1-0</h1>
      </div>

      <p className="home-greeting">Rise and shine warrior.</p>

      <div className="card">
        <div className="countdown-label">Countdown to battle</div>
        <div className="countdown-row">
          <div className="segment">
            <span className="segment-value">{String(countdown.days).padStart(2, "0")}</span>
            <span className="segment-label">Days</span>
          </div>
          <div className="segment">
            <span className="segment-value">{String(countdown.hours).padStart(2, "0")}</span>
            <span className="segment-label">Hours</span>
          </div>
          <div className="segment">
            <span className="segment-value">{String(countdown.minutes).padStart(2, "0")}</span>
            <span className="segment-label">Min</span>
          </div>
          <div className="segment">
            <span className="segment-value">{String(countdown.seconds).padStart(2, "0")}</span>
            <span className="segment-label">Sec</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">Quote of the day</div>
        <p className="quote">
          {quoteText}
          {quoteAttrib && <span className="quote-attrib">— {quoteAttrib}</span>}
        </p>
      </div>

      <div className="card">
        <div className="section-title">Daily non-negotiables</div>
        <p className="non-neg-hint">Tap the circle when done.</p>
        <ul className="non-neg-list">
          <li className="non-neg-item">
            <span
              className={
                "non-neg-label" + (completed.pushups ? " completed" : "")
              }
            >
              100 push ups
            </span>
            <button
              className={"non-neg-circle" + (completed.pushups ? " completed" : "")}
              onClick={() => handleComplete("pushups")}
              aria-label="Mark 100 push ups complete"
            >
              {completed.pushups ? "✓" : ""}
            </button>
          </li>
          <li className="non-neg-item">
            <span
              className={
                "non-neg-label" + (completed.situps ? " completed" : "")
              }
            >
              100 sit ups
            </span>
            <button
              className={"non-neg-circle" + (completed.situps ? " completed" : "")}
              onClick={() => handleComplete("situps")}
              aria-label="Mark 100 sit ups complete"
            >
              {completed.situps ? "✓" : ""}
            </button>
          </li>
          <li className="non-neg-item">
            <span
              className={
                "non-neg-label" + (completed.squats ? " completed" : "")
              }
            >
              100 squats
            </span>
            <button
              className={"non-neg-circle" + (completed.squats ? " completed" : "")}
              onClick={() => handleComplete("squats")}
              aria-label="Mark 100 squats complete"
            >
              {completed.squats ? "✓" : ""}
            </button>
          </li>
        </ul>
        {allDone && (
          <div className="completion-message">
            Well done brother, let&apos;s keep grinding. Stay hard!
          </div>
        )}
      </div>
    </div>
  );
};

const DAY_KEYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] as const;
const DAY_NAME_TO_NUM: Record<string, number> = { SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6 };

/** When ?day=WEDNESDAY (or absent, default WEDNESDAY), return that weekday's date in the current week */
function getEffectiveDate(): Date | null {
  if (typeof window === "undefined") return null;
  const dayParam = new URLSearchParams(window.location.search).get("day");
  const dayKey = (dayParam && DAY_KEYS.includes(dayParam as any) ? dayParam : "WEDNESDAY") as string;
  const dayNum = DAY_NAME_TO_NUM[dayKey] ?? 3;
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const effective = new Date(startOfWeek);
  effective.setDate(startOfWeek.getDate() + dayNum);
  return effective;
}

const WorkoutScreen: React.FC<{ effectiveDate?: Date | null }> = ({ effectiveDate }) => {
  const today = new Date();
  const defaultWeekday = effectiveDate
    ? effectiveDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
    : today.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const phase = workouts.phase1FoundationOfViolence;
  const schedule: any = phase.schedule;
  const weekday = defaultWeekday;
  const dayData = schedule[weekday] ?? schedule.MONDAY;

  return (
    <div className="screen">
      <h1 className="title">{phase.phase}</h1>
      
      {/* Phase Info */}
      <div className="card">
        <div className="section-title">Phase Focus</div>
        <p className="quote">{phase.focus}</p>
      </div>

      {/* Shadowboxing Rules */}
      <div className="card">
        <div className="section-title">Shadowboxing Rules</div>
        <div className="workout-rules-block" style={{ marginBottom: 20 }}>
          <div className="workout-subtitle" style={{ marginBottom: 12 }}>Begin Every Session</div>
          <div className="workout-items-container">
            {phase.shadowboxingRules.beginEverySession.map((rule, idx) => (
              <div key={`begin-${idx}`} className="workout-item workout-item--no-number">
                <div className="workout-item-content">{rule}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="workout-rules-block">
          <div className="workout-subtitle" style={{ marginBottom: 12 }}>End Every Session</div>
          <div className="workout-items-container">
            {phase.shadowboxingRules.endEverySession.map((rule, idx) => (
              <div key={`end-${idx}`} className="workout-item workout-item--no-number">
                <div className="workout-item-content">{rule}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      <div className="card">
        <div className="workout-title">{weekday}</div>
        <div className="workout-subtitle">{dayData.title}</div>
        {dayData.rounds && (
          <div className="workout-rounds">{dayData.rounds}</div>
        )}
        {dayData.rest && (
          <div className="workout-rest">{dayData.rest}</div>
        )}
        {dayData.roundRules != null && (
          <div className="workout-rules-block" style={{ marginBottom: 16 }}>
            <div className="workout-subtitle" style={{ marginBottom: 8 }}>Round Rules</div>
            <div className="workout-items-container">
              {(Array.isArray(dayData.roundRules) ? dayData.roundRules : [dayData.roundRules]).map((rule: string, idx: number) => (
                <div key={idx} className="workout-item workout-item--no-number">
                  <div className="workout-item-content">{rule}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {dayData.roundIntent != null && Array.isArray(dayData.roundIntent) && dayData.roundIntent.length > 0 && (
          <div className="workout-rules-block" style={{ marginBottom: 16 }}>
            <div className="workout-subtitle" style={{ marginBottom: 8 }}>Round Intent</div>
            <div className="workout-items-container">
              {dayData.roundIntent.map((line: string, idx: number) => (
                <div key={idx} className="workout-item workout-item--no-number">
                  <div className="workout-item-content">{line}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="workout-items-container workout-items-container--with-separators">
          {dayData.workout?.map((item: string, idx: number) => (
            <React.Fragment key={idx}>
              <div className="workout-item">
                <div className="workout-item-number">{idx + 1}</div>
                <div className="workout-item-content">{item}</div>
              </div>
              {idx < (dayData.workout?.length ?? 0) - 1 && (
                <div className="workout-item-separator" aria-hidden="true">
                  <span className="workout-item-separator-line" />
                  <span className="workout-item-separator-arrow">↓</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {dayData.finishFocus && (
          <div className="workout-focus">
            <div className="workout-focus-label">Finish Focus</div>
            <div className="workout-focus-text">{dayData.finishFocus}</div>
          </div>
        )}
      </div>

      {/* Wrestler-Specific Rules */}
      <div className="card">
        <div className="section-title">Wrestler-Specific Rules</div>
        <div className="workout-items-container">
          {phase.wrestlerSpecificRules.map((rule, idx) => (
            <div key={idx} className="workout-item workout-item--no-number">
              <div className="workout-item-content">{rule}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FightStudyScreen: React.FC<{ effectiveDate?: Date | null }> = ({ effectiveDate }) => {
  const fight = getFightOfTheDay(effectiveDate ?? undefined);

  return (
    <div className="screen">
      <h1 className="title">Fight Study</h1>
      <div className="card">
        <div
          className="fight-thumbnail"
          onClick={() => window.open(fight.youtubeUrl, "_blank")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.open(fight.youtubeUrl, "_blank");
            }
          }}
          aria-label={`Watch ${fight.title} on YouTube`}
        >
          <img
            src={fight.thumbnailUrl}
            alt={fight.title}
            loading="lazy"
          />
        </div>
        <h2 className="study-mindset-card-title">{fight.title}</h2>
        <div className="section-title" style={{ marginTop: 20, marginBottom: 12 }}>Focus notes</div>
        <div className="workout-items-container">
          {fight.keyTakeaways.map((point, idx) => (
            <div key={idx} className="workout-item workout-item--no-number">
              <div className="workout-item-content">{point}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MindsetScreen: React.FC<{ effectiveDate?: Date | null }> = ({ effectiveDate }) => {
  const dateStr = effectiveDate?.toDateString() ?? "";
  const item = useMemo(() => getMindsetOfTheDay(effectiveDate ?? undefined), [dateStr]);

  return (
    <div className="screen">
      <h1 className="title">Mindset</h1>

      <div className="card">
        <div
          className="fight-thumbnail"
          onClick={() => window.open(item.youtubeUrl, "_blank")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.open(item.youtubeUrl, "_blank");
            }
          }}
          aria-label={`Watch ${item.title} on YouTube`}
        >
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            loading="lazy"
          />
        </div>
        <h2 className="study-mindset-card-title">{item.title}</h2>
        <p className="mindset-message">{item.message}</p>
        <div className="section-title" style={{ marginTop: 20, marginBottom: 12 }}>Focus points</div>
        <div className="workout-items-container">
          {item.focusPoints.map((point, idx) => (
            <div key={idx} className="workout-item workout-item--no-number">
              <div className="workout-item-content">{point}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Updates when calendar day changes at 12am so Fight Study and Mindset tabs refresh by ID-date */
function useDateKey(): string {
  const [dateKey, setDateKey] = useState(() => new Date().toDateString());
  useEffect(() => {
    const id = setInterval(() => {
      const next = new Date().toDateString();
      setDateKey((prev) => (next !== prev ? next : prev));
    }, 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return dateKey;
}

const App: React.FC = () => {
  const [tab, setTab] = useState<TabId>("home");
  const dateKey = useDateKey();
  const effectiveDate = getEffectiveDate();

  let content: React.ReactNode;
  if (tab === "home") content = <HomeScreen key={tab} />;
  else if (tab === "workout") content = <WorkoutScreen key={tab} effectiveDate={effectiveDate} />;
  else if (tab === "study") content = <FightStudyScreen key={dateKey} effectiveDate={effectiveDate} />;
  else content = <MindsetScreen key={dateKey} effectiveDate={effectiveDate} />;

  return (
    <div className="app-shell">
      {content}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        <button
          className={"nav-item" + (tab === "home" ? " active" : "")}
          onClick={() => setTab("home")}
          aria-label="Home"
          aria-current={tab === "home" ? "page" : undefined}
        >
          <span className="nav-item-icon">H</span>
          <span>Home</span>
        </button>
        <button
          className={"nav-item" + (tab === "workout" ? " active" : "")}
          onClick={() => setTab("workout")}
          aria-label="Workout"
          aria-current={tab === "workout" ? "page" : undefined}
        >
          <span className="nav-item-icon">W</span>
          <span>Workout</span>
        </button>
        <button
          className={"nav-item" + (tab === "study" ? " active" : "")}
          onClick={() => setTab("study")}
          aria-label="Fight Study"
          aria-current={tab === "study" ? "page" : undefined}
        >
          <span className="nav-item-icon">S</span>
          <span>Study</span>
        </button>
        <button
          className={"nav-item" + (tab === "mindset" ? " active" : "")}
          onClick={() => setTab("mindset")}
          aria-label="Mindset"
          aria-current={tab === "mindset" ? "page" : undefined}
        >
          <span className="nav-item-icon">M</span>
          <span>Mindset</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
