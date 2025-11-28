import { useEffect, useMemo, useState } from "react";
import { fetchLessons, fetchProgress, fetchCurrentUser } from "../api/apiClient";
import LessonCard from "../components/LessonCard";

export default function Dashboard({ setUser }) {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const [lessonsRes, progressRes, meRes] = await Promise.all([
          fetchLessons(),
          fetchProgress(),
          fetchCurrentUser()
        ]);
        setLessons(lessonsRes.data);
        setProgress(progressRes.data);
        setUser(meRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [setUser]);

  if (loading) return <p className="center-text">Loading your dashboard...</p>;

  const xp = progress?.xp || 0;
  const streak = progress?.streak || 0;
  const completedIds = progress?.completedLessons?.map((l) => l._id) || [];

  // Level system: every 50 XP → next level
  const level = Math.floor(xp / 50) + 1;
  const xpIntoLevel = xp % 50;
  const xpToNext = 50 - xpIntoLevel;
  const levelProgress = (xpIntoLevel / 50) * 100;

  // Simple badges
  const badges = [];
  if (xp >= 10) badges.push("First Steps");
  if (streak >= 3) badges.push("3-Day Streak");
  if (completedIds.length >= 3) badges.push("Lesson Explorer");

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(search.toLowerCase()) ||
        (lesson.description || "").toLowerCase().includes(search.toLowerCase());
      const matchesLevel = filterLevel === "all" || lesson.level === filterLevel;
      return matchesSearch && matchesLevel;
    });
  }, [lessons, search, filterLevel]);

  // "Next up" = first lesson that is not completed
  const nextLesson =
    lessons.find((lesson) => !completedIds.includes(lesson._id)) || lessons[0];

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p className="dash-subtitle">
            Keep your streak alive and unlock new lessons. Each lesson gives you XP &amp;
            helps you level up.
          </p>
        </div>
        <div className="dash-level-card">
          <p className="label">Level</p>
          <h2>{level}</h2>
          <p className="small">
            {xpIntoLevel} / 50 XP to next level ({xpToNext} XP left)
          </p>
          <div className="progress-line">
            <div style={{ width: `${levelProgress}%` }} />
          </div>
        </div>
      </header>

      {/* Top row: continue + stats */}
      <section className="dash-top-row">
        <div className="continue-card">
          <h3>Continue learning</h3>
          <p className="small">
            {nextLesson ? `${nextLesson.title}` : "No lessons yet"}
          </p>
          <p className="tiny">
            Complete 1 lesson today to keep your daily streak.
          </p>
          {nextLesson && (
            <a href={`/learn/${nextLesson._id}`} className="btn-primary wide">
              Resume lesson
            </a>
          )}
        </div>

        <div className="stats-card">
          <div className="stat-pill">
            <span className="label">XP</span>
            <span className="value">{xp}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Streak</span>
            <span className="value">🔥 {streak}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Completed</span>
            <span className="value">{completedIds.length}</span>
          </div>
          <div className="daily-goal">
            <p className="label">Daily goal</p>
            <p className="tiny">
              {streak > 0 ? "You're on fire! Don't break the chain today." : "Complete one lesson to start a streak."}
            </p>
          </div>
        </div>

        <div className="badge-card">
          <h3>Achievements</h3>
          {badges.length === 0 ? (
            <p className="tiny">Finish a few lessons to unlock badges.</p>
          ) : (
            <ul>
              {badges.map((b) => (
                <li key={b}>🏅 {b}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Lessons + leaderboard */}
      <section className="dash-main-row">
        <div className="lessons-panel">
          <div className="lessons-header">
            <h2>All lessons</h2>
            <div className="lessons-controls">
              <input
                type="text"
                placeholder="Search lessons"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="all">All levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="lesson-grid">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                isCompleted={completedIds.includes(lesson._id)}
              />
            ))}
          </div>
        </div>

        {/* Simple local leaderboard (static data, just for UI) */}
        <aside className="leaderboard-panel">
          <h3>Leaderboard (demo)</h3>
          <p className="tiny">
            Sample leaderboard to show what a real-world feature would look like.
          </p>
          <ul className="leaderboard-list">
            <li>
              <span>👑 You</span>
              <span>{xp} XP</span>
            </li>
            <li>
              <span>Alex</span>
              <span>{xp + 40} XP</span>
            </li>
            <li>
              <span>Deeksha</span>
              <span>{xp + 25} XP</span>
            </li>
            <li>
              <span>Riya</span>
              <span>{xp + 10} XP</span>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
