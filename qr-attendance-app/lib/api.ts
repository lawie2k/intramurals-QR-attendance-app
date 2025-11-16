import { Platform, NativeModules } from "react-native";

const DEFAULT_PORT = 4000;

function resolveDevServerUrl(): string {
  // Allow explicit override via Expo env vars
  const envUrl = process.env.EXPO_PUBLIC_API_URL || process.env.API_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  if (__DEV__) {
    const scriptURL: string | undefined = NativeModules?.SourceCode?.scriptURL;
    if (scriptURL) {
      try {
        const url = new URL(scriptURL);
        const hostname = url.hostname;
        if (hostname) {
          return `http://${hostname}:${DEFAULT_PORT}`;
        }
      } catch (error) {
        // fall through to defaults
      }
    }
    // Fallback for Expo Go LAN: use localhost for simulators, 10.0.2.2 for Android emulators
    if (Platform.OS === "android") {
      return "http://10.0.2.2:4000";
    }
    return "http://localhost:4000";
  }

  // Production/staging fallback
  return "https://your-production-api.example.com";
}

export const API_URL = resolveDevServerUrl();

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = String(data.error);
    } catch {
 
    }
    throw new Error(message);
  }
  return (await res.json()) as T;
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

export async function getJson<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    ...options,
  });
  return handleResponse<T>(res);
}

export async function postJsonAuth<T>(path: string, token: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}





