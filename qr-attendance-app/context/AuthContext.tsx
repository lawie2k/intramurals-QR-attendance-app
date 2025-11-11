import React, { createContext, useContext, useState, ReactNode } from "react";

export type AuthState = {
  token: string | null;
  id: number | null;
  studentId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  department: string | null;
};

type AuthContextValue = {
  auth: AuthState;
  setAuth: (state: AuthState) => void;
  clearAuth: () => void;
  login: (session: Required<Omit<AuthState, "token">> & { token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const emptyAuthState: AuthState = {
  token: null,
  id: null,
  studentId: null,
  firstName: null,
  lastName: null,
  email: null,
  department: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(emptyAuthState);

  function setAuth(state: AuthState) {
    setAuthState(state);
  }

  function clearAuth() {
    setAuthState(emptyAuthState);
  }

  function login(session: Required<Omit<AuthState, "token">> & { token: string }) {
    setAuthState({
      token: session.token,
      id: session.id,
      studentId: session.studentId,
      firstName: session.firstName,
      lastName: session.lastName,
      email: session.email,
      department: session.department,
    });
  }

  function logout() {
    clearAuth();
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, clearAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}


