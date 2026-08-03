import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./profile.css";

// keep records within last 3 months, sorted ascending by date
function lastThreeMonths(weights) {
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
      weight: Number(w.weight),
    }));
}

const Profile = ({ user, weights = [] }) => {
  if (!user || !user.id) {
    return <div className="profile-empty">Please log in.</div>;
  }

  const chartData = lastThreeMonths(weights);

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
      </div>

      {/* weight chart */}
      <div className="profile-chart-box">
        <h3 className="profile-chart-title">Weight · Last 3 Months</h3>
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
