import { useContext, useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthContext"

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"]

export default function DashboardOverview() {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    totalChallenges: 0,
    completedChallenges: 0,
    ongoingChallenges: 0,
    totalTips: 0,
  })
  const [chartData, setChartData] = useState({
    categoriesData: [],
    progressData: [],
    statusData: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchDashboardStats = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/dashboard")
        const { challenges, tips } = res.data

        // Calculate stats
        const completed = challenges.filter(
          (c) => c.status === "Finished"
        ).length
        const ongoing = challenges.filter((c) => c.status === "Ongoing").length

        setStats({
          totalChallenges: challenges.length,
          completedChallenges: completed,
          ongoingChallenges: ongoing,
          totalTips: tips?.length || 0,
        })

        // Prepare chart data
        // 1. Challenges by category (Bar Chart)
        const categoryCounts = {}
        challenges.forEach((c) => {
          const cat = c.challenge?.category || "Other"
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
        })
        const categoriesData = Object.entries(categoryCounts).map(
          ([name, value]) => ({
            name,
            challenges: value,
          })
        )

        // 2. Progress over time (Line Chart - mock data based on dates)
        const progressByMonth = {}
        challenges.forEach((c) => {
          const month = new Date(c.joinDate).toLocaleDateString("en-US", {
            month: "short",
          })
          if (!progressByMonth[month]) {
            progressByMonth[month] = { month, joined: 0, completed: 0 }
          }
          progressByMonth[month].joined++
          if (c.status === "Finished") {
            progressByMonth[month].completed++
          }
        })
        const progressData = Object.values(progressByMonth)

        // 3. Status distribution (Pie Chart)
        const notStarted = challenges.filter(
          (c) => c.status === "Not Started"
        ).length
        const statusData = [
          { name: "Completed", value: completed },
          { name: "Ongoing", value: ongoing },
          { name: "Not Started", value: notStarted },
        ].filter((d) => d.value > 0)

        setChartData({ categoriesData, progressData, statusData })
      } catch (err) {
        console.error("Dashboard stats error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [user])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 h-32 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Challenges */}
        <div className="bg-gradient-to-br from-eco-primary to-eco-success text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Challenges</p>
              <p className="text-4xl font-bold mt-2">{stats.totalChallenges}</p>
            </div>
            <div className="text-5xl opacity-80">🎯</div>
          </div>
        </div>

        {/* Completed Challenges */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Completed</p>
              <p className="text-4xl font-bold mt-2">
                {stats.completedChallenges}
              </p>
            </div>
            <div className="text-5xl opacity-80">✅</div>
          </div>
        </div>

        {/* Ongoing Challenges */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Ongoing</p>
              <p className="text-4xl font-bold mt-2">
                {stats.ongoingChallenges}
              </p>
            </div>
            <div className="text-5xl opacity-80">🔥</div>
          </div>
        </div>

        {/* Tips Liked */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Tips Liked</p>
              <p className="text-4xl font-bold mt-2">{stats.totalTips}</p>
            </div>
            <div className="text-5xl opacity-80">💡</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Challenges by Category */}
        {chartData.categoriesData.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              📊 Challenges by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.categoriesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="challenges"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Pie Chart - Status Distribution */}
        {chartData.statusData.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              📈 Challenge Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.statusData.map((entry, index) => (
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
        )}
      </div>

      {/* Line Chart - Progress Over Time */}
      {chartData.progressData.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📉 Progress Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.progressData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="joined"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Joined"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={2}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Activities Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          📋 Recent Activities
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Challenge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.totalChallenges === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No activities yet. Start by joining a challenge!
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    View detailed activities in "My Activities" section
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
