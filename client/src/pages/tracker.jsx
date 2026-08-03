import { useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import "./tracker.css";

// format Date -> 'YYYY-MM-DD' (local, no UTC shift)
function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// record.recorded_date comes as ISO string (e.g. '2026-08-03T00:00:00.000Z');
// slice the date part directly to avoid timezone shift from new Date()
function recordKey(recordedDate) {
  return String(recordedDate).slice(0, 10);
}

function formatLabel(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const Tracker = ({ API_URL, user, weights = [], setWeights }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [weightInput, setWeightInput] = useState("");

  const userId = user && user.id;

  const dateKey = toDateKey(selectedDate);
  const recordForDate = weights.find(
    (w) => recordKey(w.recorded_date) === dateKey
  );

  const openModal = () => {
    setWeightInput(recordForDate ? String(recordForDate.weight) : "");
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveWeight = async (e) => {
    e.preventDefault();
    if (!userId || weightInput === "") return;
    try {
      const res = await fetch(`${API_URL}/api/weights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_id: userId,
          weight: Number(weightInput),
          recorded_date: dateKey,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Save failed (${res.status})`);
      }
      const saved = await res.json();
      // upsert into local state
      setWeights((prev) => {
        const rest = prev.filter(
          (w) => recordKey(w.recorded_date) !== dateKey
        );
        return [...rest, saved];
      });
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <CalendarHeader
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div className="tracker-box">
        <span className="tracker-box-label">
          Weight Record
          {recordForDate && (
            <span className="tracker-box-value"> · {recordForDate.weight} kg</span>
          )}
        </span>
        <button
          className="tracker-add-btn"
          onClick={openModal}
          aria-label="Add weight record"
        >
          +
        </button>
      </div>

      {showModal && (
        <div className="tracker-modal-overlay" onClick={closeModal}>
          <div className="tracker-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="tracker-modal-title">Weight Record</h3>
            <p className="tracker-modal-date">{formatLabel(selectedDate)}</p>
            <form onSubmit={saveWeight}>
              <input
                className="tracker-modal-input"
                type="number"
                step="0.1"
                min="0"
                placeholder="Enter weight (kg)"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                autoFocus
              />
              <div className="tracker-modal-actions">
                <button
                  type="button"
                  className="tracker-modal-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="tracker-modal-save">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
