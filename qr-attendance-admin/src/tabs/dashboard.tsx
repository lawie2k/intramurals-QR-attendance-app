import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
    // Recent activity data for chart
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

    // Student attendance data for chart
    const studentChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Present',
                data: [85, 92, 78, 88, 95, 82],
                backgroundColor: '#22C55E',
                borderColor: '#22C55E',
                borderWidth: 1,
            },
            {
                label: 'Absent',
                data: [15, 8, 22, 12, 5, 18],
                backgroundColor: '#EF4444',
                borderColor: '#EF4444',
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
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
                text: 'Daily Attendance Overview',
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

    // Events data for chart
    const eventsChartData = {
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

    // Leaderboard data for chart
    const leaderboardData = {
        labels: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Others'],
        datasets: [
            {
                data: [35, 28, 22, 15, 20],
                backgroundColor: [
                    '#900C27',
                    '#E03A2E',
                    '#F6C667',
                    '#FFB522',
                    '#E5E7EB'
                ],
                borderColor: [
                    '#900C27',
                    '#E03A2E',
                    '#F6C667',
                    '#FFB522',
                    '#E5E7EB'
                ],
                borderWidth: 2,
            }
        ],
    };

    const eventsChartOptions = {
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

    const leaderboardChartOptions = {
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
                text: 'Team Rankings',
                color: '#374151',
                font: {
                    size: 14,
                    weight: 'bold' as const
                }
            },
        },
    };
	return (
		<div className=" h-[900px] px-[40px] pt-[20px] ">
			<h1 className=" font-bold text-[36px]">Dashboard</h1>
		<div>
			<div className="w-full h-[650px] mt-[10px] flex flex-col">

				<div className="flex justify-between ">
				<div className="w-[590px] h-[280px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
                    <h2 className="text-lg font-bold mb-3">Recent Activity</h2>
                    <div className="h-[200px]">
                        <Bar data={recentActivityData} options={recentActivityOptions} />
                    </div>
                </div>
				<div className="w-[590px] h-[280px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
                    <h2 className="text-lg font-bold mb-3">Student Attendance</h2>
                    <div className="h-[200px]">
                        <Bar data={studentChartData} options={chartOptions} />
                    </div>
                </div>
				</div>
				<div className="flex justify-between mt-[30px]">
				<div className="w-[500px] h-[500px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
                    <h2 className="text-lg font-bold mb-3">Events</h2>
                    <div className="h-[400px]">
                        <Bar data={eventsChartData} options={eventsChartOptions} />
                    </div>
                </div>
				<div className="w-[680px] h-[500px] bg-[#F1F8FD] shadow-[2px_2px_0px_0px_rgba(0,_0,_0,_0.1)] p-4">
                    <h2 className="text-lg font-bold mb-3">Leaderboards</h2>
                    <div className="h-[400px] flex items-center justify-center">
                        <div className="w-[300px] h-[300px]">
                            <Doughnut data={leaderboardData} options={leaderboardChartOptions} />
                        </div>
                    </div>
                </div>
				</div>
				
			</div>
			</div>
		</div>
	);
}

