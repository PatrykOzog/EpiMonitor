import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import "./DashboardPage.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { InitialFormDataType } from "../components/variables/initialFormData";
import { WorldMapChart } from "../components/WorldMapChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

function aggregateByCountry(data: { country: string }[]) {
  const counts: Record<string, number> = {};

  data.forEach(({ country }) => {
    if (country) {
      counts[country] = (counts[country] || 0) + 1;
    }
  });

  return counts;
}

function aggregateBySymptoms(data: { symptoms: string[] }[]) {
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    item.symptoms.forEach((symptom) => {
      counts[symptom] = (counts[symptom] || 0) + 1;
    });
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function aggregateByMonth(data: { created_at: string }[]) {
  const counts: { [month: string]: number } = {};

  data.forEach(({ created_at }) => {
    const cleanTimestamp = created_at.split(".")[0];
    const date = new Date(cleanTimestamp.replace(" ", "T"));

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const monthYear = `${month}-${year}`;

    counts[monthYear] = (counts[monthYear] || 0) + 1;
  });

  const sortedData = Object.entries(counts)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => {
      const [monthA, yearA] = a.month.split("-").map(Number);
      const [monthB, yearB] = b.month.split("-").map(Number);
      return (
        new Date(yearA, monthA - 1).getTime() -
        new Date(yearB, monthB - 1).getTime()
      );
    });

  return sortedData;
}

function aggregateByAge(data: { age: number }[]) {
  const bins: Record<string, number> = {};

  data.forEach((item) => {
    const age = item.age;

    if (typeof age !== "number" || age < 1 || age > 100) return;

    const lower = Math.floor((age - 1) / 10) * 10 + 1;
    const upper = lower + 9;
    const label = `${lower}–${upper}`;

    bins[label] = (bins[label] || 0) + 1;
  });

  return Object.entries(bins)
    .map(([name, value]) => ({ name, value }))
    .sort(
      (a, b) => parseInt(a.name.split("-")[0]) - parseInt(b.name.split("-")[0])
    );
}

function aggregateByField(
  data: InitialFormDataType[],
  field: "gender" | "vaccination" | "country",
  labelMap?: Record<string, string>
) {
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const rawValue = item[field]?.toLowerCase?.();
    if (!rawValue) return;
    const label = labelMap?.[rawValue] ?? capitalize(rawValue);
    counts[label] = (counts[label] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const DashboardPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [surveys, setSurveys] = useState<InitialFormDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch("/api/get-surveys");
        const data = await res.json();
        setSurveys(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const genderDistribution = aggregateByField(surveys, "gender");
  const vaccinationDistribution = aggregateByField(surveys, "vaccination");
  const countryDistribution = aggregateByCountry(surveys);
  const ageDistribution = aggregateByAge(
    surveys.filter((s) => s.age != null).map((s) => ({ age: Number(s.age) }))
  );
  const monthDistribution = aggregateByMonth(
    surveys
      .filter((s) => s.created_at != null)
      .map((s) => ({ created_at: String(s.created_at) }))
  );
  const symptomsDistribution = aggregateBySymptoms(
    surveys
      .filter((s) => Array.isArray(s.symptoms))
      .map((s) => ({ symptoms: s.symptoms }))
  );

  return (
    <>
      <Header loggedIn={loggedIn} />
      {!loading ? (
        <main>
          <h4 className="text">Dashboard - Survey data visualization</h4>
          <p className="text">Explore the data collected from the survey.</p>
          <div className="charts-container">
            <div className="chart-row">
              <div className="chart-item">
                <h5 className="text">Gender distribution</h5>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={genderDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-item">
                <h5 className="text">Vaccination distribution</h5>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={vaccinationDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {vaccinationDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-row">
              <div className="chart-item">
                <h5 className="text">Age distribution</h5>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-row">
              <div className="chart-item">
                <h5 className="text">Symptoms distribution</h5>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={symptomsDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-row">
              <div className="chart-item">
                <h5 className="text">Gender Distribution</h5>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-row">
              <div className="chart-item">
                <h5 className="text">Country distribution</h5>
                <WorldMapChart data={countryDistribution} />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main>
          <h4 className="text">Dashboard is loading...</h4>
        </main>
      )}
    </>
  );
};
