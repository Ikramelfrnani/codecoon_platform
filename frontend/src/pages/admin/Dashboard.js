import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import NavAdmin from "../../Components/NavAdmin";
import './AdminDashboard.css';
import Loader from "../../Components/Loader"; // ← your loader

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [terminesData, setTerminesData] = useState(null);
  const [loadingTermines, setLoadingTermines] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resStats = await fetch("http://localhost:8000/api/admin/stats", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!resStats.ok) throw new Error("Error fetching stats");
        const dataStats = await resStats.json();

        const resTermines = await fetch("http://localhost:8000/api/admin/langages-termines", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!resTermines.ok) throw new Error("Error fetching completed data");
        const dataTermines = await resTermines.json();

        setStats(dataStats);
        setTerminesData(dataTermines.data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  const handleUpdateTermines = async () => {
    setLoadingTermines(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/admin/update-nombre-utilisateurs-termines", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error updating data");
      const json = await res.json();
      setTerminesData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingTermines(false);
    }
  };

  if (error) return <div className="error-waera">{error}</div>;
  if (!stats) return <><Loader /></>; // ← your loader here without any change

  return (
    <>
      <NavAdmin />
      <main className="dashboard-waera no-scroll">

        {/* Statistic Cards */}
        <section className="cards-waera cards-row-waera">
          <div className="card-waera card-simple">
            <h2>{stats.totalApprenants} K</h2>
            <p>Registered learners</p>
          </div>
          <div className="card-waera card-simple">
            <h2>{stats.apprenantsActifsParMois.length}</h2>
            <p>Active months</p>
          </div>
          <div className="card-waera card-simple">
            <h2>{stats.progressionMoyenneLangages.length}</h2>
            <p>Languages tracked</p>
          </div>
        </section>

        {/* Charts */}
        <section className="charts-side-by-side">
          {/* Chart 1 */}
          <div className="chart-wrapper-waera">
            <div className="chart-header-waera">
              <h3 style={{ marginTop: '4.8% '}}>Learners per month</h3>
            </div>
            <ResponsiveContainer width="90%" height={250}>
              <LineChart data={stats.apprenantsActifsParMois}>
                <CartesianGrid stroke="#333" strokeDasharray="4 4" />
                <XAxis dataKey="mois" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: "#222" }} itemStyle={{ color: "#f5a623" }} />
                <Line type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={3} dot={{ r: 5, strokeWidth: 2, fill: "#f9a8d4" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="chart-wrapper-waera">
            <div className="chart-header-waera">
              <h3 style={{ marginTop: '4% ', marginRight: '10.7%' }}>Languages completed by learners</h3>
              <button
                style={{ marginTop: '5% ', marginRight: '10.7%' }}
                className="btn-waera"
                onClick={handleUpdateTermines}
                disabled={loadingTermines}
              >
                {loadingTermines ? "Updating..." : "Update"}
              </button>
            </div>
            {terminesData && terminesData.length > 0 ? (
              <ResponsiveContainer width="90%" height={250}>
                <BarChart data={terminesData}>
                  <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                  <XAxis dataKey="lang" stroke="#fff" />
                  <YAxis stroke="#fff" allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#222" }} itemStyle={{ color: "#67e8f9" }} />
                  <Bar dataKey="count" fill="#6f1a91" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
