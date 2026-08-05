import { useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import ErrorMessage from "../components/ErrorMessage.jsx";
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

function kgToLb(kg) {
  return Number(kg) * 2.20462;
}

function lbToKg(lb) {
  return Number(lb) / 2.20462;
}

function formatWeight(value, unit) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return "";
  return unit === "lb" ? kgToLb(numeric).toFixed(1) : numeric.toString();
}

const Tracker = ({ API_URL, user, weights = [], setWeights, weightUnit = "kg" }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [weightInput, setWeightInput] = useState("");
  const [error, setError] = useState(null);

  const userId = user && user.id;

  const dateKey = toDateKey(selectedDate);
  const recordForDate = weights.find(
    (w) => recordKey(w.recorded_date) === dateKey
  );

  const openModal = () => {
    setWeightInput(recordForDate ? formatWeight(recordForDate.weight, weightUnit) : "");
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveWeight = async (e) => {
    e.preventDefault();
    if (!userId || weightInput === "") return;
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/weights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_id: userId,
          weight: weightUnit === "lb" ? Number(lbToKg(weightInput).toFixed(3)) : Number(weightInput),
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
      setError(err.message || "Failed to save weight. Please try again.");
    }
  };

  const deleteWeight = async () => {
    if (!recordForDate) return;
    const confirmed = window.confirm(
      `Delete weight record for ${formatLabel(selectedDate)}?`
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`${API_URL}/api/weights/${recordForDate.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Delete failed (${res.status})`);
      }
      setWeights((prev) =>
        prev.filter((w) => recordKey(w.recorded_date) !== dateKey)
      );
      setWeightInput("");
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete weight. Please try again.");
    }
  };

  return (
    <div>
      <CalendarHeader
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        weights={weights}
        weightUnit={weightUnit}
      />

      <div className="tracker-box">
        <span className="tracker-box-label">
          Weight Record
          {recordForDate && (
            <span className="tracker-box-value"> · {formatWeight(recordForDate.weight, weightUnit)} {weightUnit}</span>
          )}
        </span>
        <button
          className={`tracker-add-btn ${recordForDate ? "is-edit" : "is-add"}`}
          onClick={openModal}
          aria-label={recordForDate ? "Edit weight record" : "Add weight record"}
        >
          {recordForDate ? "Edit Record" : "+"}
        </button>
      </div>

      {showModal && (
        <div className="tracker-modal-overlay" onClick={closeModal}>
          <div className="tracker-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="tracker-modal-title">Weight Record</h3>
            <p className="tracker-modal-date">{formatLabel(selectedDate)}</p>
            <div className="tracker-modal-unit-badge">Current unit: {weightUnit}</div>
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
            <form onSubmit={saveWeight}>
              <input
                className="tracker-modal-input"
                type="number"
                step="0.1"
                min="0"
                placeholder={`Enter weight (${weightUnit})`}
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                autoFocus
              />
              <div className="tracker-modal-actions">
                {recordForDate && (
                  <button
                    type="button"
                    className="tracker-modal-delete"
                    onClick={deleteWeight}
                  >
                    Delete
                  </button>
                )}
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
