import { useState } from "react";
import { useAdminAuth } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { CompanySettings } from "@/components/admin/CompanySettings";
import { UsersManager } from "@/components/admin/UsersManager";
import { FinancialReports } from "@/components/admin/FinancialReports";
import { LogOut, Bell } from "lucide-react";

export function AdminDashboard() {
  const { user, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New quote request received", read: false },
    { id: 2, message: "Order #1234 status updated to 'Processing'", read: false },
    { id: 3, message: "New user registered", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-500">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="outline" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          {user?.role === "admin" && <TabsTrigger value="users">Users</TabsTrigger>}
          {(user?.role === "admin" || user?.role === "executive") && (
            <TabsTrigger value="company">Company</TabsTrigger>
          )}
          {(user?.role === "admin" || user?.role === "executive") && (
            <TabsTrigger value="financial">Financial</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <p className="text-sm text-green-600">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$128,450</div>
                <p className="text-sm text-green-600">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending Quotes</CardTitle>
                <CardDescription>Awaiting response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15</div>
                <p className="text-sm text-amber-600">5 high priority</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Notifications</CardTitle>
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-3 rounded-md ${
                      notification.read ? "bg-slate-50" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{notification.message}</span>
                      {!notification.read && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <ProductsManager />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersManager />
        </TabsContent>

        <TabsContent value="users">
          <UsersManager />
        </TabsContent>

        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}