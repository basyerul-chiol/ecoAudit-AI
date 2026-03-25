import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Home, 
  Building2, 
  LogOut, 
  ChevronRight,
  Zap,
  Info,
  User,
  Bell,
  Shield,
  HelpCircle,
  Leaf
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export function SettingsScreen() {
  const navigate = useNavigate();
  const [gridFactor, setGridFactor] = useState("0.585");
  const [notifications, setNotifications] = useState(true);
  const [autoCalculate, setAutoCalculate] = useState(true);

  const handleLogout = () => {
    navigate("/login");
  };

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
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">Manage your account and configurations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="col-span-1">
              <Card className="bg-white rounded-2xl p-6 border-0 shadow-md sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4">Settings Menu</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 bg-green-50 text-[#1B5E20] rounded-xl font-medium">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm">Company Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-gray-700 rounded-xl">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm">Emission Factors</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-gray-700 rounded-xl">
                    <User className="w-5 h-5" />
                    <span className="text-sm">Account Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-gray-700 rounded-xl">
                    <Bell className="w-5 h-5" />
                    <span className="text-sm">Notifications</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-gray-700 rounded-xl">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-sm">Help & Support</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-1.5 rounded-lg">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">EcoAudit AI</p>
                  </div>
                  <p className="text-xs text-gray-500">Version 1.0.0</p>
                  <p className="text-xs text-gray-400 mt-1">Build 2026.02</p>
                </div>
              </Card>
            </div>

            {/* Right Content Area */}
            <div className="col-span-2 space-y-6">
              {/* Company Profile */}
              <Card className="bg-white rounded-2xl p-8 border-0 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Company Profile</h3>
                    <p className="text-sm text-gray-500">Update your business information</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company-name" className="text-sm text-gray-700 mb-2">
                      Company Name
                    </Label>
                    <Input
                      id="company-name"
                      defaultValue="Maju Jaya Manufacturing Sdn Bhd"
                      className="bg-gray-50 border-gray-200 rounded-xl h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="registration" className="text-sm text-gray-700 mb-2">
                      Registration Number
                    </Label>
                    <Input
                      id="registration"
                      defaultValue="202301234567"
                      className="bg-gray-50 border-gray-200 rounded-xl h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="industry" className="text-sm text-gray-700 mb-2">
                      Industry Sector
                    </Label>
                    <Input
                      id="industry"
                      defaultValue="Manufacturing"
                      className="bg-gray-50 border-gray-200 rounded-xl h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm text-gray-700 mb-2">
                      Business Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="contact@yourcompany.com"
                      className="bg-gray-50 border-gray-200 rounded-xl h-12"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="address" className="text-sm text-gray-700 mb-2">
                      Business Address
                    </Label>
                    <Input
                      id="address"
                      defaultValue="123 Jalan Sentosa, Kuala Lumpur, Malaysia"
                      className="bg-gray-50 border-gray-200 rounded-xl h-12"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl h-11 px-6">
                    Cancel
                  </Button>
                  <Button className="bg-[#1B5E20] hover:bg-[#145214] text-white rounded-xl h-11 px-6">
                    Save Changes
                  </Button>
                </div>
              </Card>

              {/* Emission Factor Configuration */}
              <Card className="bg-white rounded-2xl p-8 border-0 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Emission Factor Engine</h3>
                    <p className="text-sm text-gray-500">Modular factor configuration (Admin only)</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Admin users can configure Malaysia Grid Emission Factor. Default value is based on Energy Commission of Malaysia 2024 data. Changes affect all future calculations.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="grid-factor" className="text-sm text-gray-700 mb-2">
                          Malaysia Grid Factor (kg CO₂e/kWh)
                        </Label>
                        <Input
                          id="grid-factor"
                          type="number"
                          step="0.001"
                          value={gridFactor}
                          onChange={(e) => setGridFactor(e.target.value)}
                          className="bg-white border-gray-300 rounded-xl h-12 font-mono"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="bg-white rounded-xl p-4 border border-gray-200 w-full">
                          <p className="text-xs text-gray-500">Last Updated</p>
                          <p className="text-sm font-semibold text-gray-900">January 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-4">Other Emission Factors</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Petrol (RON95)</p>
                          <p className="text-xs text-gray-500">Mobile Combustion - Scope 1</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-semibold text-gray-900">2.31</p>
                          <p className="text-xs text-gray-500">kg CO₂e/L</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Diesel</p>
                          <p className="text-xs text-gray-500">Mobile Combustion - Scope 1</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-semibold text-gray-900">2.68</p>
                          <p className="text-xs text-gray-500">kg CO₂e/L</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Natural Gas</p>
                          <p className="text-xs text-gray-500">Stationary Combustion - Scope 1</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-semibold text-gray-900">2.75</p>
                          <p className="text-xs text-gray-500">kg CO₂e/m³</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Preferences */}
              <Card className="bg-white rounded-2xl p-8 border-0 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Preferences</h3>
                    <p className="text-sm text-gray-500">Customize your experience</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive alerts for new bills and reports</p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Auto-Calculate Emissions</p>
                      <p className="text-sm text-gray-500">Calculate immediately after OCR extraction</p>
                    </div>
                    <Switch
                      checked={autoCalculate}
                      onCheckedChange={setAutoCalculate}
                    />
                  </div>

                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition">
                    <div>
                      <p className="font-medium text-gray-900">Security & Password</p>
                      <p className="text-sm text-gray-500">Change password and 2FA settings</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition">
                    <div>
                      <p className="font-medium text-gray-900">Data Export</p>
                      <p className="text-sm text-gray-500">Download all your carbon data</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </Card>

              {/* Support Links */}
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-0">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <button className="p-4 bg-white hover:bg-gray-50 rounded-xl transition">
                    <HelpCircle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Help Center</p>
                  </button>
                  <button className="p-4 bg-white hover:bg-gray-50 rounded-xl transition">
                    <Shield className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Privacy Policy</p>
                  </button>
                  <button className="p-4 bg-white hover:bg-gray-50 rounded-xl transition">
                    <Info className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">About</p>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
