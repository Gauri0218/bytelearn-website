import { useEffect, useState } from "react";

export default function LessonCard({ lesson, onNext }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
  setSeconds(0);
  const timer = setInterval(() => {
    setSeconds((prev) => {
      if (prev + 1 >= lesson.durationSeconds) {
        clearInterval(timer);
        return lesson.durationSeconds;
      }
      return prev + 1;
    });
  }, 1000);

  return () => clearInterval(timer);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [lesson._id]);
(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev + 1 >= lesson.durationSeconds) {
          clearInterval(timer);
          return lesson.durationSeconds;
        }
        return prev + 1;
      });
    }, 1000);

    // cleanup when component unmounts
    return () => clearInterval(timer);
  }, []); // no deps, because component remounts when key changes

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{lesson.title}</h2>
      <p>{lesson.content}</p>

      <p style={{ fontSize: "12px", marginTop: "10px" }}>
        ⏳ {seconds}/{lesson.durationSeconds}s
      </p>

      <div
        style={{
          width: "100%",
          height: "6px",
          background: "#ddd",
          borderRadius: "6px",
          marginTop: "4px"
        }}
      >
        <div
          style={{
            width: `${(seconds / lesson.durationSeconds) * 100}%`,
            height: "100%",
            background: "#007bff",
            borderRadius: "6px"
          }}
        />
      </div>

      <button
        onClick={onNext}
        style={{
          marginTop: "15px",
          padding: "10px",
          width: "100%",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Next Lesson
      </button>
    </div>
  );
}
