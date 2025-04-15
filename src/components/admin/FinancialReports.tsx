import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar } from "lucide-react";

// Mock financial data
const monthlyRevenue = [
  { name: "Jan", revenue: 65000, expenses: 45000, profit: 20000 },
  { name: "Feb", revenue: 72000, expenses: 48000, profit: 24000 },
  { name: "Mar", revenue: 80000, expenses: 52000, profit: 28000 },
  { name: "Apr", revenue: 75000, expenses: 50000, profit: 25000 },
  { name: "May", revenue: 85000, expenses: 55000, profit: 30000 },
  { name: "Jun", revenue: 95000, expenses: 60000, profit: 35000 },
  { name: "Jul", revenue: 100000, expenses: 62000, profit: 38000 },
  { name: "Aug", revenue: 110000, expenses: 65000, profit: 45000 },
  { name: "Sep", revenue: 105000, expenses: 63000, profit: 42000 },
  { name: "Oct", revenue: 115000, expenses: 68000, profit: 47000 },
  { name: "Nov", revenue: 125000, expenses: 70000, profit: 55000 },
  { name: "Dec", revenue: 135000, expenses: 75000, profit: 60000 },
];

const productCategoryData = [
  { name: "Generators", value: 35 },
  { name: "Excavators", value: 25 },
  { name: "Loaders", value: 20 },
  { name: "Cranes", value: 15 },
  { name: "Drilling", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function FinancialReports() {
  const [timeframe, setTimeframe] = useState("year");
  const [year, setYear] = useState("2023");

  const handleExportReport = () => {
    alert("Exporting financial report...");
    // In a real app, this would generate and download a PDF or Excel file
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Financial Reports</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" onClick={handleExportReport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="products">Product Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-500 mb-1">Total Revenue</div>
                  <div className="text-3xl font-bold">$1,162,000</div>
                  <div className="text-sm text-green-600 mt-1">+12% from last year</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-500 mb-1">Total Expenses</div>
                  <div className="text-3xl font-bold">$713,000</div>
                  <div className="text-sm text-amber-600 mt-1">+8% from last year</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-500 mb-1">Net Profit</div>
                  <div className="text-3xl font-bold">$449,000</div>
                  <div className="text-sm text-green-600 mt-1">+18% from last year</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyRevenue}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#4f46e5" name="Revenue" />
                      <Bar dataKey="expenses" fill="#f97316" name="Expenses" />
                      <Bar dataKey="profit" fill="#22c55e" name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyRevenue}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4f46e5"
                        activeDot={{ r: 8 }}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span>Product Sales</span>
                      <span className="font-medium">$980,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Maintenance Contracts</span>
                      <span className="font-medium">$120,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Parts & Accessories</span>
                      <span className="font-medium">$45,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Training Services</span>
                      <span className="font-medium">$17,000</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Customer Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Construction", value: 45 },
                            { name: "Mining", value: 30 },
                            { name: "Manufacturing", value: 15 },
                            { name: "Other", value: 10 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            { name: "Construction", value: 45 },
                            { name: "Mining", value: 30 },
                            { name: "Manufacturing", value: 15 },
                            { name: "Other", value: 10 },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="expenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenses Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyRevenue}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#f97316"
                        activeDot={{ r: 8 }}
                        name="Expenses"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Inventory", value: 40 },
                          { name: "Salaries", value: 25 },
                          { name: "Operations", value: 15 },
                          { name: "Marketing", value: 10 },
                          { name: "Other", value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "Inventory", value: 40 },
                          { name: "Salaries", value: 25 },
                          { name: "Operations", value: 15 },
                          { name: "Marketing", value: 10 },
                          { name: "Other", value: 10 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productCategoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {productCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "PowerMax 500kW", sales: 12 },
                          { name: "EarthMover X450", sales: 10 },
                          { name: "MobilePower 100kW", sales: 8 },
                          { name: "FrontLoad Pro 950", sales: 7 },
                          { name: "SkyLift T120", sales: 5 },
                        ]}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Units Sold
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Profit Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: "PowerMax 500kW", category: "Generators", units: 12, revenue: "$980,000", margin: "32%" },
                        { name: "EarthMover X450", category: "Excavators", units: 10, revenue: "$4,200,000", margin: "28%" },
                        { name: "MobilePower 100kW", category: "Generators", units: 8, revenue: "$320,000", margin: "35%" },
                        { name: "FrontLoad Pro 950", category: "Loaders", units: 7, revenue: "$1,680,000", margin: "30%" },
                        { name: "SkyLift T120", category: "Cranes", units: 5, revenue: "$5,500,000", margin: "25%" },
                      ].map((product, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {product.units}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {product.revenue}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {product.margin}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}