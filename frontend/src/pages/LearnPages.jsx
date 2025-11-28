import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessonById, completeLesson, fetchCurrentUser } from "../api/apiClient";
import CompletionModal from "../components/CompletionModal";

export default function LearnPages({ setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const [timer, setTimer] = useState(30); // seconds per question
  const [showModal, setShowModal] = useState(false);
  const [xpAfter, setXpAfter] = useState(0);
  const [streakAfter, setStreakAfter] = useState(0);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const res = await fetchLessonById(id);
        setLesson(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadLesson();
  }, [id]);

  // countdown timer
  useEffect(() => {
    if (!lesson) return;
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, lesson]);

  useEffect(() => {
    // if time is up and user hasn't selected anything, auto-go next
    if (timer === 0 && selected === null && lesson) {
      handleNext(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  if (!lesson) return <p className="center-text">Loading lesson...</p>;

  const total = lesson.questions.length;
  const question = lesson.questions[currentIndex];
  const questionProgress = ((currentIndex + 1) / total) * 100;
  const timerProgress = (timer / 30) * 100;

  const handleOptionClick = (idx) => {
    if (selected !== null) return; // prevent double click
    setSelected(idx);
    const correct = idx === question.answerIndex;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = async (autoFromTimer = false) => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setIsCorrect(null);
      setTimer(30);
    } else {
      // finished
      try {
        const res = await completeLesson(lesson._id, { score });
        setXpAfter(res.data.xp);
        setStreakAfter(res.data.streak);
        const me = await fetchCurrentUser();
        setUser(me.data);
        setShowModal(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="lesson-play">
      <header className="lesson-header">
        <div>
          <h1>{lesson.title}</h1>
          <p className="tiny">
            {lesson.language} • {lesson.level} • {lesson.xpReward} XP
          </p>
        </div>
        <div className="question-progress">
          <span className="tiny">
            Lesson {currentIndex + 1} of {total}
          </span>
          <div className="progress-line">
            <div style={{ width: `${questionProgress}%` }} />
          </div>
        </div>
      </header>

      <section className="lesson-card-main">
        <p className="question-text">{question.prompt}</p>

        <div className="timer-row">
          <span className="tiny">⏳ {timer}s left</span>
          <div className="progress-line thin">
            <div style={{ width: `${timerProgress}%` }} />
          </div>
        </div>

        <div className="options-grid">
          {question.options.map((opt, idx) => {
            let className = "option-btn";
            if (selected !== null) {
              if (idx === question.answerIndex) className += " correct";
              else if (idx === selected && idx !== question.answerIndex)
                className += " incorrect";
            }

            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleOptionClick(idx)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="feedback">
            {isCorrect ? "✅ Correct!" : "❌ Not quite, keep going!"}
          </div>
        )}

        <button
          className="btn-primary next-btn"
          disabled={selected === null && timer > 0}
          onClick={() => handleNext(false)}
        >
          {currentIndex === total - 1 ? "Finish Lesson" : "Next"}
        </button>
      </section>

      <CompletionModal
        isOpen={showModal}
        xpEarned={xpAfter}
        streak={streakAfter}
        onClose={handleCloseModal}
      />
    </div>
  );
}
