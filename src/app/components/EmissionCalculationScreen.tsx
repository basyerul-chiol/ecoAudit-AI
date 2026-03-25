import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Home, CheckCircle2, Calculator, Info, Award, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useLocation } from "react-router";

export function EmissionCalculationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [emissionsKg, setEmissionsKg] = useState(0);

  const activityData = Number(data?.totalUsage || 0);
  const emissionFactor = 0.585;
  const calculatedEmissionsKg = activityData * emissionFactor;
  const emissionsTonnes = (calculatedEmissionsKg / 1000).toFixed(3);
  

  useEffect(() => {
  const calculateEmission = async () => {
    try {
      const response = await fetch(
        "https://syakirahhjzamani-ecoaudit-ai-engine.hf.space/process-bill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
           company: "MajuJayaManufacturing",
           bill_type: "electricity",
           value: Number(data?.totalUsage || 0),
          })
        }
      );

      const result = await response.json();
      console.log("sent body:", {
        company: "MajuJayaManufacturing",
        bill_type: "electricity",
        value: Number(data?.totalUsage || 0),
      });
      console.log("API Response:", result);

      setEmissionsKg(result.results?.carbon_kg || 0);
      
      
      

    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (data) {
    calculateEmission();
  }
}, [data]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Home className="w-5 h-5 text-gray-600" />
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">Carbon Calculation</h1>
              <p className="text-sm text-gray-500">GHG Protocol methodology</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Emission Calculation Result</h2>
            <p className="text-gray-600">Based on GHG Protocol Corporate Standard</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Formula & Calculation */}
            <div className="col-span-2 space-y-6">
              {/* Calculation Formula Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">GHG Protocol Formula</h3>
                    <p className="text-sm text-gray-600">Standard calculation methodology</p>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-center space-y-3">
                    <p className="font-mono text-lg text-gray-900">
                      <strong>Emissions (kg CO₂e)</strong> =
                    </p>
                    <p className="font-mono text-lg text-gray-900">
                      Activity Data × Emission Factor
                    </p>
                  </div>
                </div>
              </Card>

              {/* Calculation Breakdown */}
              <Card className="bg-white rounded-2xl p-8 border-0 shadow-md">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Calculation Breakdown</h4>
                
                <div className="space-y-6">
                  {/* Activity Data */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                    <p className="text-sm text-gray-500 mb-2">Activity Data (Electricity Consumption)</p>
                    <p className="text-4xl font-bold text-[#1B5E20]">{activityData} kWh</p>
                    <p className="text-sm text-gray-600 mt-2">From TNB electricity bill dated 20 Jan 2026</p>
                  </div>

                  {/* Multiplication Symbol */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                      <span className="text-2xl font-bold text-gray-400">×</span>
                    </div>
                  </div>

                  {/* Emission Factor */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Emission Factor (Malaysia Grid)</p>
                      <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        <span className="text-xs">Source</span>
                      </button>
                    </div>
                    <p className="text-4xl font-bold text-[#1B5E20]">{emissionFactor}</p>
                    <p className="text-sm text-gray-700 mt-2">kg CO₂e per kWh</p>
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <p className="text-xs text-gray-600">
                        Source: Energy Commission of Malaysia (2024)
                      </p>
                    </div>
                  </div>

                  {/* Equals Symbol */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                      <span className="text-2xl font-bold text-gray-400">=</span>
                    </div>
                  </div>

                  {/* Result in kg */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-[#A5D6A7]">
                    <p className="text-sm text-gray-600 mb-2">Total Emissions</p>
                    <p className="text-5xl font-bold text-[#1B5E20]">{calculatedEmissionsKg.toFixed(2)}</p>
                    <p className="text-lg text-gray-700 mt-2">kg CO₂e</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Result & Info */}
            <div className="col-span-1 space-y-6">
              {/* Final Result Card */}
              <Card className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 text-white border-0 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Final Result</h3>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-center py-6">
                  <p className="text-6xl font-bold mb-3">{emissionsTonnes}</p>
                  <p className="text-xl opacity-90">Tonnes CO₂e</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-6">
                  <p className="text-sm opacity-90 text-center">
                    <strong>Scope 2:</strong> Purchased Electricity
                    <br />
                    <span className="text-xs">(Indirect Emissions)</span>
                  </p>
                </div>
              </Card>

              {/* Compliance Badge */}
              <Card className="bg-green-50 border-green-200 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-[#1B5E20] p-2.5 rounded-full flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900 mb-1">
                      ✓ GHG Protocol Compliant
                    </p>
                    <p className="text-xs text-green-700 leading-relaxed">
                      Calculation follows GHG Protocol Corporate Standard
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pt-3 border-t border-green-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-800">ISO 14064-1:2018</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-800">Malaysia Standards</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </Card>

              {/* Environmental Impact */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500 p-2 rounded-lg flex-shrink-0">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">
                      Environmental Context
                    </p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      This is equivalent to:
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-gray-600">
                      <li>• 1.3 trees needed for 1 year</li>
                      <li>• 644 km driven by car</li>
                      <li>• 29 kg of coal burned</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Emission Factor Source */}
              <Card className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      Emission Factor Details
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p><strong>Factor:</strong> 0.585 kg CO₂e/kWh</p>
                      <p><strong>Region:</strong> Malaysia Grid Mix</p>
                      <p><strong>Source:</strong> Energy Commission</p>
                      <p><strong>Year:</strong> 2024 Data</p>
                      <p><strong>Updated:</strong> January 2026</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 max-w-5xl mx-auto">
            <Button
              onClick={() => navigate("/upload")}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-14 text-base"
            >
              Upload Another Bill
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gray-700 hover:bg-gray-800 text-white rounded-xl h-14 text-base"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => navigate("/report")}
              className="flex-1 bg-[#1B5E20] hover:bg-[#145214] text-white rounded-xl h-14 text-base"
            >
              Generate ESG Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
