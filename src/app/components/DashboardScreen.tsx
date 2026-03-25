import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  Leaf,
  Zap,
  Fuel,
  Droplets,
  Upload,
  FileDown,
  Settings,
  CheckCircle2,
  BarChart3,
  Calendar
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const companyName = "Maju Jaya Manufacturing";

const scopeData = [
  { name: "Scope 1 (Petrol)", value: 0.82, color: "#1B5E20" },
  { name: "Scope 2 (Electricity)", value: 1.53, color: "#A5D6A7" },
];

const breakdownData = [
  {
    icon: Zap,
    label: "Electricity",
    scope: "Scope 2",
    value: "1.53",
    unit: "Tonnes CO₂e",
    color: "bg-[#A5D6A7]",
    percentage: "+5%",
    usage: "450 kWh"
  },
  {
    icon: Fuel,
    label: "Petrol",
    scope: "Scope 1",
    value: "0.82",
    unit: "Tonnes CO₂e",
    color: "bg-[#1B5E20]",
    percentage: "-2%",
    usage: "355 Liters"
  },
  {
    icon: Droplets,
    label: "Water Usage",
    scope: "Indirect",
    value: "125",
    unit: "m³",
    color: "bg-blue-400",
    percentage: "0%",
    usage: "125 m³"
  },
];

const recentActivities = [
  { date: "20 Feb 2026", type: "TNB Bill", amount: "450 kWh", emissions: "0.263 Tonnes" },
  { date: "18 Feb 2026", type: "Petrol Receipt", amount: "50 L", emissions: "0.116 Tonnes" },
  { date: "15 Feb 2026", type: "TNB Bill", amount: "380 kWh", emissions: "0.222 Tonnes" },
  { date: "10 Feb 2026", type: "Water Bill", amount: "125 m³", emissions: "N/A" },
];

export function DashboardScreen() {
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [animatedData, setAnimatedData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          "https://syakirahhjzamani-ecoaudit-ai-engine.hf.space/analytics/monthly?company=MajuJayaManufacturing"
        );

        const result = await response.json();
        console.log("Dashboard API:", result);

        let formatted = Object.entries(result.monthly_data || {}).map(
          ([month, value]) => {
            const date = new Date(`${month}-01`);
            return {
              month: date.toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              }),
              scope1: 0,
              scope2: Number(value) / 1000,
            };
          }
        );

        const latestUploadRaw = localStorage.getItem("latestUpload");
        if (latestUploadRaw) {
          const latestUpload = JSON.parse(latestUploadRaw);

          const existingIndex = formatted.findIndex(
            (item) => item.month === latestUpload.month
          );

          if (existingIndex !== -1) {
            formatted[existingIndex] = {
              ...formatted[existingIndex],
              scope2: latestUpload.value,
            };
          } else {
            formatted.push({
              month: latestUpload.month,
              scope1: 0,
              scope2: latestUpload.value,
            });
          }
        }

        setMonthlyData(formatted);
        setSummary(result.summary_metrics || null);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (monthlyData.length > 0) {
      setAnimatedData(
        monthlyData.map((item) => ({
          ...item,
          scope1: 0,
          scope2: 0,
        }))
      );

      const timer = setTimeout(() => {
        setAnimatedData(monthlyData);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [monthlyData]);

  const handleDownloadReport = () => {
    window.open(
      "https://syakirahhjzamani-ecoaudit-ai-engine.hf.space/generate-report?company=majujayamanufacturing",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-2.5 rounded-xl">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EcoAudit AI</h1>
                  <p className="text-xs text-gray-500">Smart Carbon Reporting</p>
                </div>
              </div>

              <div className="ml-8 flex items-center gap-6">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-sm font-medium text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1"
                >
                  Dashboard
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Reports
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Analytics
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/upload")}
                className="bg-[#1B5E20] hover:bg-[#145214] text-white rounded-lg h-10 px-4 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Bill
              </Button>
              <button
                onClick={() => navigate("/settings")}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Sustainability Dashboard</h2>
              <p className="text-gray-600 mt-1">{companyName} • February 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">This Month</span>
              </button>
              <Button
                onClick={handleDownloadReport}
                className="bg-white border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-green-50 rounded-lg h-10 px-4 flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-6 border-0 shadow-lg col-span-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Leaf className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-sm text-white/80 mb-1">Total Emissions</p>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-4xl font-bold text-white">
                {summary?.total_emissions_tonnes?.toFixed?.(3) ?? "0.000"}
              </h3>
              <span className="text-lg text-white/90">Tonnes CO₂e</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/90 font-medium">Live monthly analytics</span>
              <CheckCircle2 className="w-4 h-4 text-white/90" />
            </div>
          </Card>

          {breakdownData.map((item, index) => (
            <Card key={index} className="bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className={`${item.color} p-3 rounded-xl`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-bold text-gray-900">{item.value}</h4>
                  <span className="text-sm text-gray-600">{item.unit}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{item.usage}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <Card className="bg-white rounded-2xl p-6 border-0 shadow-md col-span-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Carbon Emission Trends</h4>
                <p className="text-sm text-gray-500 mt-1">Monthly historical data</p>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={animatedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  label={{
                    value: "Tonnes CO₂e",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 12, fill: "#6b7280" }
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
                  iconType="circle"
                />
                <Bar
                  dataKey="scope1"
                  name="Scope 1"
                  fill="#1B5E20"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="scope2"
                  name="Scope 2"
                  fill="#A5D6A7"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-white rounded-2xl p-6 border-0 shadow-md col-span-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Scope Distribution</h4>
            <p className="text-sm text-gray-500 mb-6">Current month breakdown</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={scopeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {scopeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <Card className="bg-white rounded-2xl p-6 border-0 shadow-md col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Recent Activity</h4>
              <button className="text-sm text-[#1B5E20] hover:underline font-medium">View All</button>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-4 px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                <div>Date</div>
                <div>Type</div>
                <div>Usage</div>
                <div className="text-right">Emissions</div>
              </div>
              {recentActivities.map((activity, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="text-sm text-gray-600">{activity.date}</div>
                  <div className="text-sm font-medium text-gray-900">{activity.type}</div>
                  <div className="text-sm text-gray-600">{activity.amount}</div>
                  <div className="text-sm font-semibold text-[#1B5E20] text-right">{activity.emissions}</div>
                </div>
              ))}
            </div>
          </Card>

          <div className="col-span-4 space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#1B5E20] p-2.5 rounded-lg flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 mb-1">
                    GHG Protocol Compliant
                  </p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Your carbon calculations follow the GHG Protocol Corporate Standard
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-3 border-t border-green-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-800">ISO 14064-1:2018</span>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-800">Bank ESG Ready</span>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-2xl p-6 border-0 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/upload")}
                  className="w-full flex items-center gap-3 p-3 bg-[#1B5E20] hover:bg-[#145214] text-white rounded-lg transition"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-sm font-medium">Upload New Bill</span>
                </button>
                <button
                  onClick={() => navigate("/report")}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition"
                >
                  <FileDown className="w-5 h-5" />
                  <span className="text-sm font-medium">Generate Report</span>
                </button>
                <button
                  onClick={() => navigate("/calculation")}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm font-medium">View Calculations</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}