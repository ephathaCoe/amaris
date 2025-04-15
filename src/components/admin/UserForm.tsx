import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface UserFormProps {
  user?: any;
  onSubmit: (user: any) => void;
}

export function UserForm({ user, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    id: user?.id || 0,
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "sales",
    active: user?.active !== undefined ? user.active : true,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleActiveChange = (checked: boolean) => {
    setFormData({ ...formData, active: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email) {
      alert("Name and email are required");
      return;
    }
    
    if (!user && (!formData.password || formData.password !== formData.confirmPassword)) {
      alert("Passwords must match");
      return;
    }
    
    // Remove password fields before submitting if they're empty (for editing)
    const userData = { ...formData };
    if (!userData.password) {
      delete userData.password;
      delete userData.confirmPassword;
    }
    
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name*</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address*</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Role*</Label>
        <Select value={formData.role} onValueChange={handleRoleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="executive">Executive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">{user ? "New Password (leave blank to keep current)" : "Password*"}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required={!user}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{user ? "Confirm New Password" : "Confirm Password*"}</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required={!user}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={handleActiveChange}
        />
        <Label htmlFor="active">Active Account</Label>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          {user ? "Update User" : "Add User"}
        </Button>
      </div>
    </form>
  );
}