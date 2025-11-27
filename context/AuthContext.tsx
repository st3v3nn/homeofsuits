import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address, Order } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('hos_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - accept any email/password for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        // ADMIN LOGIN CHECK
        if (email === 'admin@homeofsuits.com' && password === 'admin123') {
           const adminUser: User = {
             id: 'admin_01',
             name: 'Administrator',
             email: email,
             phone: '+254 700 000 000',
             addresses: [],
             orders: [],
             joinedDate: new Date().toISOString(),
             role: 'admin'
           };
           setUser(adminUser);
           localStorage.setItem('hos_user', JSON.stringify(adminUser));
           resolve(true);
           return;
        }

        // CUSTOMER LOGIN
        // To preserve data in this demo, we check if the current localstorage user matches email
        const existing = localStorage.getItem('hos_user');
        if (existing) {
           const parsed = JSON.parse(existing);
           if (parsed.email === email) {
             setUser(parsed);
             resolve(true);
             return;
           }
        }

        const mockUser: User = {
          id: 'u1',
          name: 'James Bond',
          email: email,
          phone: '+254 712 345 678',
          addresses: [],
          orders: [],
          joinedDate: new Date().toISOString(),
          role: 'customer'
        };

        setUser(mockUser);
        localStorage.setItem('hos_user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: 'u_' + Date.now(),
          name,
          email,
          addresses: [],
          orders: [],
          joinedDate: new Date().toISOString(),
          role: 'customer'
        };
        setUser(newUser);
        localStorage.setItem('hos_user', JSON.stringify(newUser));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hos_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('hos_user', JSON.stringify(updatedUser));
    }
  };

  const addAddress = (address: Address) => {
    if (user) {
      const updatedUser = { ...user, addresses: [...user.addresses, address] };
      setUser(updatedUser);
      localStorage.setItem('hos_user', JSON.stringify(updatedUser));
    }
  };

  const removeAddress = (id: string) => {
    if (user) {
      const updatedUser = { ...user, addresses: user.addresses.filter(a => a.id !== id) };
      setUser(updatedUser);
      localStorage.setItem('hos_user', JSON.stringify(updatedUser));
    }
  };

  const addOrder = (order: Order) => {
    if (user) {
      const updatedUser = { ...user, orders: [order, ...user.orders] };
      setUser(updatedUser);
      localStorage.setItem('hos_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, addAddress, removeAddress, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};