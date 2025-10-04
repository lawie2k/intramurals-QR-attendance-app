import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function SuperAdminDashboard() {
    // Student Attendance by All Departments data
    const studentAttendanceData = {
        labels: ['Engineering', 'Business', 'Arts', 'Science', 'Medicine', 'Law', 'Education'],
        datasets: [
            {
                label: 'Present',
                data: [85, 92, 78, 88, 95, 82, 90],
                backgroundColor: '#22C55E',
                borderColor: '#22C55E',
                borderWidth: 2,
            },
            {
                label: 'Absent',
                data: [15, 8, 22, 12, 5, 18, 10],
                backgroundColor: '#EF4444',
                borderColor: '#EF4444',
                borderWidth: 2,
            }
        ],
    };

    const studentAttendanceOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#374151',
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Student Attendance by Department',
                color: '#374151',
                font: {
                    size: 14,
                    weight: 'bold' as const
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    color: '#E5E7EB',
                }
            },
            x: {
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    color: '#E5E7EB',
                }
            },
        },
    };

    // Leaderboard data
    const leaderboardData = {
        labels: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Epsilon'],
        datasets: [
            {
                data: [35, 28, 22, 15, 12],
                backgroundColor: [
                    '#900C27',
                    '#E03A2E',
                    '#F6C667',
                    '#FFB522',
                    '#4A90E2'
                ],
                borderColor: [
                    '#900C27',
                    '#E03A2E',
                    '#F6C667',
                    '#FFB522',
                    '#4A90E2'
                ],
                borderWidth: 2,
            }
        ],
    };

    const leaderboardOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#374151',
                    font: {
                        size: 10
                    }
                }
            },
            title: {
                display: true,
                text: 'Team Leaderboard',
                color: '#374151',
                font: {
                    size: 14,
                    weight: 'bold' as const
                }
            },
        },
    };

    // Events data
    const eventsData = {
        labels: ['Basketball', 'Volleyball', 'Football', 'Swimming', 'Tennis', 'Badminton'],
        datasets: [
            {
                label: 'Participants',
                data: [45, 32, 28, 18, 15, 12],
                backgroundColor: [
                    '#900C27',
                    '#E03A2E', 
                    '#F6C667',
                    '#FFB522',
                    '#4A90E2',
                    '#7ED321'
                ],
                borderColor: [
                    '#900C27',
                    '#E03A2E',
                    '#F6C667', 
                    '#FFB522',
                    '#4A90E2',
                    '#7ED321'
                ],
                borderWidth: 2,
            }
        ],
    };

    const eventsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#374151',
                    font: {
                        size: 10
                    }
                }
            },
            title: {
                display: true,
                text: 'Event Participation',
                color: '#374151',
                font: {
                    size: 14,
                    weight: 'bold' as const
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    color: '#E5E7EB',
                }
            },
            x: {
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    color: '#E5E7EB',
                }
            },
        },
    };

    // Recent Activity data
    const recentActivityData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'QR Scans',
                data: [45, 52, 38, 48],
                backgroundColor: '#900C27',
                borderColor: '#900C27',
                borderWidth: 2,
            },
            {
                label: 'Manual Check-ins',
                data: [12, 8, 15, 10],
                backgroundColor: '#F6C667',
                borderColor: '#F6C667',
                borderWidth: 2,
            }
        ],
    };

    const recentActivityOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#374151',
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Weekly Check-in Activity',
                color: '#374151',
                font: {
                    size: 14,
                    weight: 'bold' as const
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    color: '#E5E7EB',
                }
            },
            x: {
                ticks: {
                    color: '#6B7280',
                },
                grid: {
                    color: '#E5E7EB',
                }
            },
        },
    };

	return (
		<div className=" h-[900px] px-[40px] pt-[20px] ">
			<h1 className=" font-bold text-[36px] text-red-600">Super Admin Dashboard</h1>
			
		<div>
			<div className="w-full h-[650px] mt-[10px] flex flex-col">

				<div className="flex justify-between ">
				<div className="w-[590px] h-[280px] bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
                    <h2 className="text-lg font-bold mb-3 text-red-700">Student Attendance by All Departments</h2>
                    <div className="h-[200px]">
                        <Bar data={studentAttendanceData} options={studentAttendanceOptions} />
                    </div>
                </div>
				<div className="w-[590px] h-[280px] bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
                    <h2 className="text-lg font-bold mb-3 text-red-700">Recent Activity</h2>
                    <div className="h-[200px]">
                        <Bar data={recentActivityData} options={recentActivityOptions} />
                    </div>
                </div>
				</div>
				<div className="flex justify-between mt-[30px]">
				<div className="w-[500px] h-[500px] bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
                    <h2 className="text-lg font-bold mb-3 text-red-700">Events</h2>
                    <div className="h-[400px]">
                        <Bar data={eventsData} options={eventsOptions} />
                    </div>
                </div>
				<div className="w-[680px] h-[500px] bg-[#FEF2F2] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4 border-l-4 border-red-500">
                    <h2 className="text-lg font-bold mb-3 text-red-700">Leaderboard</h2>
                    <div className="h-[400px] flex items-center justify-center">
                        <div className="w-[300px] h-[300px]">
                            <Doughnut data={leaderboardData} options={leaderboardOptions} />
                        </div>
                    </div>
                </div>
				</div>
				
			</div>
			</div>
		</div>
	);
}
