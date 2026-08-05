import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function kgToLb(kg) {
  return Number(kg) * 2.20462;
}

// keep records within last 3 months, sorted ascending by date
function lastThreeMonths(weights, weightUnit) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 3);
  cutoff.setHours(0, 0, 0, 0);

  return weights
    .map((w) => ({ ...w, dateObj: new Date(w.recorded_date) }))
    .filter((w) => w.dateObj >= cutoff)
    .sort((a, b) => a.dateObj - b.dateObj)
    .map((w) => ({
      date: w.dateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      weight: weightUnit === "lb" ? Number(kgToLb(w.weight).toFixed(1)) : Number(w.weight),
    }));
}

const Profile = ({ user, weights = [], weightUnit = "kg", setWeightUnit, onLogout }) => {
  const navigate = useNavigate();
  if (!user || !user.id) {
    return <div className="profile-empty">Please log in.</div>;
  }

  const chartData = lastThreeMonths(weights, weightUnit);

  // waits for the session to actually clear before redirecting to the home page
  const handleLogoutClick = async () => {
    await onLogout();
    navigate('/');
  };

  return (
    <div className="profile">
      {/* user info */}
      <div className="profile-info">
        {user.avatarurl && (
          <img className="profile-avatar" src={user.avatarurl} alt="avatar" />
        )}
        <div>
          <h2 className="profile-name">{user.username}</h2>
          <p className="profile-sub">User ID: {user.id}</p>
        </div>
        <button className="profile-logout-button" onClick={handleLogoutClick}>Log out</button>
      </div>

      {/* weight chart */}
      <div className="profile-chart-box">
        <div className="profile-chart-head">
          <h3 className="profile-chart-title">Weight · Last 3 Months ({weightUnit})</h3>
          <div className="profile-unit-toggle" role="group" aria-label="Weight unit">
            <button
              type="button"
              className={`profile-unit-btn ${weightUnit === "kg" ? "active" : ""}`}
              onClick={() => setWeightUnit && setWeightUnit("kg")}
            >
              Metric (kg)
            </button>
            <button
              type="button"
              className={`profile-unit-btn ${weightUnit === "lb" ? "active" : ""}`}
              onClick={() => setWeightUnit && setWeightUnit("lb")}
            >
              Imperial (lb)
            </button>
          </div>
        </div>
        {chartData.length === 0 ? (
          <p className="profile-chart-empty">No weight records yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e3efd6" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#3b6d11" }} />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tick={{ fontSize: 12, fill: "#3b6d11" }}
                label={{ value: weightUnit, angle: -90, position: "insideLeft", fill: "#3b6d11" }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#1e5c2e"
                strokeWidth={2}
                dot={{ r: 3, fill: "#1e5c2e" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Profile;
