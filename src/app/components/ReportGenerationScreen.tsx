import { useState } from "react";
import { useNavigate } from "react-router";
import { Home, FileDown, Calendar, CheckCircle2, Building2, Leaf, Share2, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type ReportState = "idle" | "generated";

export function ReportGenerationScreen() {
  const navigate = useNavigate();
  const [reportState, setReportState] = useState<ReportState>("idle");
  const [selectedPeriod, setSelectedPeriod] = useState("jan-2026");

  const handleGenerateReport = () => {
    setReportState("generated");
  };

  const handleDownloadReport = () => {
    window.open(
      "https://syakirahhjzamani-ecoaudit-ai-engine.hf.space/generate-report?company=MajuJayaManufacturing",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-xl font-bold text-gray-900">Generate ESG Report</h1>
              <p className="text-sm text-gray-500">Bank-ready carbon footprint documentation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {reportState === "idle" && (
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 space-y-6">
                <Card className="bg-white rounded-2xl p-6 border-0 shadow-md">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Report Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Reporting Period
                      </label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger className="w-full h-12 rounded-xl bg-gray-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jan-2026">January 2026</SelectItem>
                          <SelectItem value="dec-2025">December 2025</SelectItem>
                          <SelectItem value="nov-2025">November 2025</SelectItem>
                          <SelectItem value="q4-2025">Q4 2025 (Oct-Dec)</SelectItem>
                          <SelectItem value="2025">Full Year 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Report Format
                      </label>
                      <Select defaultValue="pdf">
                        <SelectTrigger className="w-full h-12 rounded-xl bg-gray-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                          <SelectItem value="csv">CSV Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Report Type
                      </label>
                      <Select defaultValue="full">
                        <SelectTrigger className="w-full h-12 rounded-xl bg-gray-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full ESG Report</SelectItem>
                          <SelectItem value="summary">Executive Summary</SelectItem>
                          <SelectItem value="data">Data Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>

                <Button
                  onClick={handleGenerateReport}
                  className="w-full bg-[#1B5E20] hover:bg-[#145214] text-white rounded-xl h-14 flex items-center justify-center gap-2"
                >
                  <FileDown className="w-5 h-5" />
                  Generate Report
                </Button>
              </div>

              <div className="col-span-2 space-y-6">
                <Card className="bg-white rounded-2xl p-8 border-0 shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Report Preview</h3>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Building2 className="w-6 h-6 text-gray-600" />
                        <p className="font-semibold text-gray-900">Company Information</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Company Name:</span>
                          <p className="font-medium text-gray-900 mt-1">Your Company Sdn Bhd</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Registration No:</span>
                          <p className="font-medium text-gray-900 mt-1">202301234567</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Industry:</span>
                          <p className="font-medium text-gray-900 mt-1">Manufacturing</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Reporting Period:</span>
                          <p className="font-medium text-gray-900 mt-1">January 2026</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Leaf className="w-6 h-6 text-[#1B5E20]" />
                        <p className="font-semibold text-gray-900">Emissions Summary</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Total Emissions</p>
                          <p className="text-2xl font-bold text-[#1B5E20]">2.35</p>
                          <p className="text-xs text-gray-500">Tonnes CO₂e</p>
                        </div>
                        <div className="text-center bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Scope 1</p>
                          <p className="text-2xl font-bold text-gray-900">0.82</p>
                          <p className="text-xs text-gray-500">Tonnes CO₂e</p>
                        </div>
                        <div className="text-center bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Scope 2</p>
                          <p className="text-2xl font-bold text-gray-900">1.53</p>
                          <p className="text-xs text-gray-500">Tonnes CO₂e</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-3">
                            Compliance Standards
                          </p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">GHG Protocol Corporate Standard</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">ISO 14064-1:2018 Compatible</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">Malaysia Grid Factors (2024)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">Bank ESG Requirements</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <p className="font-semibold text-gray-900 mb-4">Report Contents</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "Executive Summary",
                          "Organizational Boundary",
                          "Calculation Methodology",
                          "Activity Data & Factors",
                          "Monthly Trend Analysis",
                          "Supporting Documents",
                          "Verification Statement",
                          "Appendices & Notes"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {reportState === "generated" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-2xl p-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#1B5E20] p-6 rounded-full">
                    <CheckCircle2 className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-green-900 mb-3">
                  ✓ ESG-Ready Report Generated
                </h3>
                <p className="text-lg text-green-700 mb-8">
                  Your carbon footprint report is ready for download
                </p>
                <div className="bg-white rounded-2xl p-8 text-left max-w-2xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-100 p-4 rounded-xl">
                        <FileDown className="w-8 h-8 text-red-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          Carbon_Footprint_Report_Jan2026.pdf
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Generated on 20 Feb 2026 at 3:45 PM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">2.4 MB</p>
                      <p className="text-sm text-gray-500">12 pages</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-14 text-base"
                >
                  Back to Dashboard
                </Button>

                <Button
                  onClick={handleDownloadReport}
                  className="bg-[#1B5E20] hover:bg-[#145214] text-white rounded-xl h-14 text-base flex items-center justify-center gap-2"
                >
                  <FileDown className="w-5 h-5" />
                  Download PDF
                </Button>

                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 text-base flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share Report
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-white rounded-2xl p-6 border-0 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-4">Share Via</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-sm text-gray-700 transition flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-sm text-gray-700 transition flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      WhatsApp
                    </button>
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-sm text-gray-700 transition flex items-center gap-2">
                      🔗
                      Copy Link
                    </button>
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-sm text-gray-700 transition flex items-center gap-2">
                      ☁️
                      Cloud Save
                    </button>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500 p-3 rounded-xl flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">
                        Bank Submission Ready
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        This report meets ESG disclosure requirements for Malaysian banks including Maybank, CIMB, Public Bank, and RHB Bank for green financing applications.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="bg-white rounded-2xl p-8 border-0 shadow-md">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Report Features</h4>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Verified Data</p>
                    <p className="text-xs text-gray-600">OCR-extracted and validated</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <FileDown className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Professional Format</p>
                    <p className="text-xs text-gray-600">Bank-ready PDF layout</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">GHG Compliant</p>
                    <p className="text-xs text-gray-600">Follows international standards</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}