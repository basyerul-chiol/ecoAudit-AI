import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, Camera, FileText, Loader2, CheckCircle2, Home, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type UploadState = "idle" | "processing" | "success";

export function UploadBillScreen() {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleImageUpload = async (file: File) => {
    setUploadState("processing");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "https://syakirahhjzamani-ecoaudit-ai-engine.hf.space/process-bill-image?company=MajuJayaManufacturing",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", response.status, errorText);

        setExtractedData({
          billType: "TNB",
          totalUsage: "",
          unit: "kWh",
          billingDate: "",
          accountNumber: "",
          confidence: "",
          carbonResult: 0,
        });
        setUploadState("success");
        return;
      }

      const result = await response.json();
      console.log("OCR Result:", result);

      const extraction = result.ocr_data || {};

      setExtractedData({
        billType: extraction.bill_type || "TNB",
        totalUsage: extraction.value || "",
        unit: "kWh",
        billingDate: extraction.date || "",
        accountNumber: extraction.total_rn || "",
        confidence: extraction.confidence || "",
        carbonResult: result.carbon_result || 0,
      });

      setUploadState("success");
    } catch (error) {
      console.error("Upload error:", error);

      setExtractedData({
        billType: "TNB",
        totalUsage: "",
        unit: "kWh",
        billingDate: "",
        accountNumber: "",
        confidence: "",
        carbonResult: 0,
      });
      setUploadState("success");
    }
  };

  const handleManualFill = () => {
    setUploadState("processing");

    setTimeout(() => {
      setExtractedData({
        billType: "TNB",
        totalUsage: "",
        unit: "kWh",
        billingDate: "",
        accountNumber: "",
        confidence: "",
        carbonResult: 0,
      });
      setUploadState("success");
    }, 500);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(
        "https://syakirahhjzamani-ecoaudit-ai-engine.hf.space/process-bill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company: "MajuJayaManufacturing",
            bill_type: "electricity",
            value: Number(extractedData.totalUsage),
          }),
        }
      );

      const result = await response.json();
      console.log("Manual API Result:", result);

      navigate("/calculation", {
        state: {
          ...extractedData,
          carbonResult: result?.results?.carbon_kg || extractedData.carbonResult || 0,
        },
      });
    } catch (error) {
      console.error("Manual submit error:", error);

      navigate("/calculation", {
        state: extractedData,
      });
      localStorage.setItem(
        "latestUpload",
        JSON.stringify({
          month: "2026-03",
          value: Number(extractedData.totalUsage || 0) * 0.585
        })
      );
    }
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
              <h1 className="text-xl font-bold text-gray-900">Upload Utility Bill</h1>
              <p className="text-sm text-gray-500">OCR-powered data extraction</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {uploadState === "idle" && (
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Bill</h2>
                  <p className="text-gray-600">Choose how you'd like to upload your utility bill</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer bg-white border-2 border-[#1B5E20] hover:bg-green-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition group min-h-[190px]">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                    />
                    <div className="bg-[#1B5E20] group-hover:bg-[#145214] p-4 rounded-2xl transition">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 text-lg">Take Photo / Select Image </p>
                      <p className="text-sm text-gray-500 mt-1">Use camera on mobile or choose an image file if using a computer</p>
                    </div>
                  </label>

                  <label className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#1B5E20] hover:bg-green-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition group min-h-[190px]">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                    />
                    <div className="bg-gray-100 group-hover:bg-[#1B5E20] p-4 rounded-2xl transition">
                      <Upload className="w-10 h-10 text-gray-600 group-hover:text-white transition" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 text-lg">Upload Image</p>
                      <p className="text-sm text-gray-500 mt-1">From your computer</p>
                    </div>
                  </label>

                  <label className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#1B5E20] hover:bg-green-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition group min-h-[190px]">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={() => {
                        handleManualFill();
                      }}
                    />
                    <div className="bg-gray-100 group-hover:bg-[#1B5E20] p-4 rounded-2xl transition">
                      <FileText className="w-10 h-10 text-gray-600 group-hover:text-white transition" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 text-lg">Upload PDF</p>
                      <p className="text-sm text-gray-500 mt-1">Digital bill document</p>
                    </div>
                  </label>

                  <button
                    onClick={handleManualFill}
                    className="bg-white border-2 border-gray-200 hover:border-[#1B5E20] hover:bg-green-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition group min-h-[190px]"
                  >
                    <div className="bg-gray-100 group-hover:bg-[#1B5E20] p-4 rounded-2xl transition">
                      <Pencil className="w-10 h-10 text-gray-600 group-hover:text-white transition" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 text-lg">Manual Fill In</p>
                      <p className="text-sm text-gray-500 mt-1">Enter bill details manually</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-[#A5D6A7] rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    Upload Instructions
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1B5E20] mt-0.5 flex-shrink-0" />
                      <span>Ensure <strong>Total Usage</strong> is clearly visible in the bill</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1B5E20] mt-0.5 flex-shrink-0" />
                      <span>Check units are shown: <strong>kWh, Liters, or m³</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1B5E20] mt-0.5 flex-shrink-0" />
                      <span>Supported: TNB bills, Petrol receipts, Water bills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1B5E20] mt-0.5 flex-shrink-0" />
                      <span>Clear photo with good lighting works best</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1B5E20] mt-0.5 flex-shrink-0" />
                      <span>Supported formats: JPG, PNG, PDF (max 10MB)</span>
                    </li>
                  </ul>
                </Card>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 bg-white flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <FileText className="w-24 h-24 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Preview will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {uploadState === "processing" && (
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white rounded-2xl p-12 text-center border-0 shadow-lg">
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 rounded-full animate-pulse">
                    <Loader2 className="w-16 h-16 text-white animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Reading Bill...
                </h3>
                <p className="text-gray-600 mb-12">
                  OCR is extracting bill type, usage, and date
                </p>
              </Card>
            </div>
          )}

          {uploadState === "success" && extractedData && (
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  {extractedData?.totalUsage ? "Bill Data Extracted Successfully" : "Review & Edit Required"}
                </h3>
                <p className="text-green-700">
                  {extractedData?.totalUsage
                    ? "OCR has extracted the bill information. Please review before calculating."
                    : "Please fill in or verify the correct values from the bill before calculating"}
                </p>
              </Card>

              <Card className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Bill Information</h4>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-sm text-gray-500 mb-2">Bill Type</p>
                    <input
                      type="text"
                      value={extractedData.billType || ""}
                      onChange={(e) =>
                        setExtractedData({
                          ...extractedData,
                          billType: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-semibold text-gray-900 bg-white"
                    />
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Total Usage</p>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={extractedData.totalUsage || ""}
                        onChange={(e) =>
                          setExtractedData({
                            ...extractedData,
                            totalUsage: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-2xl font-bold text-[#1B5E20] bg-white"
                        placeholder="Enter usage"
                      />
                      <span className="text-lg text-gray-700">{extractedData.unit || "kWh"}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-sm text-gray-500 mb-2">Billing Date</p>
                    <input
                      type="text"
                      value={extractedData.billingDate || ""}
                      onChange={(e) =>
                        setExtractedData({
                          ...extractedData,
                          billingDate: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-semibold text-gray-900 bg-white"
                      placeholder="Enter billing date"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-sm text-gray-500 mb-2">Account Number</p>
                    <input
                      type="text"
                      value={extractedData.accountNumber || ""}
                      onChange={(e) =>
                        setExtractedData({
                          ...extractedData,
                          accountNumber: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-semibold text-gray-900 bg-white"
                      placeholder="Enter account number"
                    />
                  </div>
                </div>

                {extractedData.confidence ? (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                      OCR Confidence: <strong>{extractedData.confidence}</strong>
                    </p>
                  </div>
                ) : null}
              </Card>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => setUploadState("idle")}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-14 text-base"
                >
                  Edit Information
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-[#1B5E20] hover:bg-[#145214] text-white rounded-xl h-14 text-base"
                >
                  Confirm & Calculate Emissions
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}