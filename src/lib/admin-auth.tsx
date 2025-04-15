import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "admin" | "sales" | "executive" | null;

interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

interface AdminAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("amaris_admin_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("amaris_admin_user");
      }
    }
    setIsInitializing(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call to verify credentials
    // For demo purposes, we'll use hardcoded credentials
    
    // IMPORTANT: In production, this should be replaced with a secure API call
    if (email === "admin@amaris.com" && password === "admin123") {
      const adminUser: User = {
        id: 1,
        email: "admin@amaris.com",
        name: "Admin User",
        role: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("amaris_admin_user", JSON.stringify(adminUser));
      return;
    }
    
    if (email === "sales@amaris.com" && password === "sales123") {
      const salesUser: User = {
        id: 2,
        email: "sales@amaris.com",
        name: "Sales Manager",
        role: "sales",
      };
      setUser(salesUser);
      localStorage.setItem("amaris_admin_user", JSON.stringify(salesUser));
      return;
    }
    
    if (email === "ceo@amaris.com" && password === "ceo123") {
      const ceoUser: User = {
        id: 3,
        email: "ceo@amaris.com",
        name: "CEO",
        role: "executive",
      };
      setUser(ceoUser);
      localStorage.setItem("amaris_admin_user", JSON.stringify(ceoUser));
      return;
    }
    
    throw new Error("Invalid credentials");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("amaris_admin_user");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInitializing,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}