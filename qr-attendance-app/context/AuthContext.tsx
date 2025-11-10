import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthState = {
  token: string | null;
  id: number | null;  // Database ID (for API calls)
  studentId: string | null;  // Student ID string (for display, e.g., "143903")
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};

type AuthContextValue = {
  auth: AuthState;
  setAuth: (state: AuthState) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const initialState: AuthState = {
  token: null,
  id: null,
  studentId: null,
  firstName: null,
  lastName: null,
  email: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(initialState);

  const setAuth = (state: AuthState) => {
    setAuthState(state);
  };

  const clearAuth = () => setAuthState(initialState);

  return (
    <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}


