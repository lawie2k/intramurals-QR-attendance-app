import React from "react";

export default function SuperAdminSystemLogs() {
    const systemLogs = [
        { id: 1, timestamp: "2024-01-15 14:30:25", level: "CRITICAL", message: "Database connection pool exhausted", user: "system", ip: "127.0.0.1" },
        { id: 2, timestamp: "2024-01-15 14:28:12", level: "ERROR", message: "Failed authentication attempt for admin user", user: "admin@umtc.edu", ip: "192.168.1.100" },
        { id: 3, timestamp: "2024-01-15 14:25:45", level: "WARNING", message: "High memory usage detected on server-01", user: "system", ip: "127.0.0.1" },
        { id: 4, timestamp: "2024-01-15 14:22:18", level: "INFO", message: "Student data export completed", user: "superadmin@umtc.edu", ip: "192.168.1.50" },
        { id: 5, timestamp: "2024-01-15 14:20:33", level: "SECURITY", message: "Suspicious login pattern detected", user: "student123@umtc.edu", ip: "203.45.67.89" },
        { id: 6, timestamp: "2024-01-15 14:18:56", level: "AUDIT", message: "Financial data accessed by admin", user: "admin@umtc.edu", ip: "192.168.1.100" },
        { id: 7, timestamp: "2024-01-15 14:15:42", level: "ERROR", message: "API rate limit exceeded", user: "mobile-app", ip: "10.0.0.15" },
        { id: 8, timestamp: "2024-01-15 14:12:27", level: "INFO", message: "Backup process initiated", user: "system", ip: "127.0.0.1" },
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case "CRITICAL": return "text-red-600 bg-red-100";
            case "ERROR": return "text-red-500 bg-red-50";
            case "WARNING": return "text-yellow-600 bg-yellow-100";
            case "SECURITY": return "text-purple-600 bg-purple-100";
            case "AUDIT": return "text-blue-600 bg-blue-100";
            case "INFO": return "text-green-600 bg-green-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    return (
        <div className="h-[900px] px-[40px] pt-[20px]">
            <h1 className="font-bold text-[36px] text-red-600">System Logs</h1>
            <p className="text-gray-600 text-sm mb-4">🔍 Real-time system monitoring and audit trails</p>
            
            <div className="mt-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-red-50 px-6 py-4 border-b border-red-200">
                        <h2 className="text-xl font-semibold text-red-800">Live System Logs</h2>
                        <p className="text-red-600 text-sm">Last updated: {new Date().toLocaleString()}</p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {systemLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                                            {log.timestamp}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                                                {log.level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                                            {log.message}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {log.user}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                            {log.ip}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
