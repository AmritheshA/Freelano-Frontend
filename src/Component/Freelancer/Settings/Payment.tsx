import { Line } from "react-chartjs-2";
import { Button } from "@mui/material";
import { FaWallet } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { format } from "date-fns";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Month =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

const monthOrder: { [key in Month]: number } = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
};



function Payment() {

    const [amount, setAmount] = useState<number[]>([]);
    const [months, setMonths] = useState<Month[]>([]);
    const [transaction, setTransaction] = useState<Transaction[]>([]);
    const [total, setTotal] = useState<number>(0);

    const user = useSelector((state: RootState) => state.userDetails.user);

    useEffect(() => {
        const getMonthlyRevenue = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const response = await axiosInstance.get(`/api/v1/payment/monthly-revenue?freelancerId=${user?.userId}&role=${user?.role}`, config);

                const responseData = response.data;
                setTransaction(responseData.transactions);

                const monthsArray = Object.keys(responseData.monthlyRevenue) as Month[];
                const sortedMonths = sortMonths(monthsArray);
                setMonths(sortedMonths);

                const amountsArray = Object.values(responseData.monthlyRevenue) as number[];
                const totalAmount = amountsArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                setTotal(totalAmount);
                setAmount(amountsArray);

            } catch (error) {
                console.error('Error fetching monthly revenue:', error);
            }
        };

        getMonthlyRevenue();
    }, []);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Revenue',
                data: amount,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: '#4CAF50', // Change the line color to a nice green
                borderWidth: 3, // Increase the line width
                pointBackgroundColor: '#00000', // Change the point color to match the line
                pointBorderColor: '#FFFFFF', // Add a white border to the points
                pointBorderWidth: 0, // Increase the point border width
                pointRadius: 5, // Increase the point radius
            },
        ],
    };

    const sortMonths = (months: Month[]): Month[] => {
        return months.sort((a, b) => monthOrder[a] - monthOrder[b]);
    };


    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                    font: {
                        family: 'Roboto, sans-serif', // Change the font family
                        size: 16,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Revenue',
                    font: {
                        family: 'Roboto, sans-serif',
                        size: 16,
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Roboto, sans-serif',
                        size: 14,
                    },
                },
            },
        },
    };

    function formatDateTime(dateTimeString: any) {
        return format(new Date(dateTimeString), "yyyy-MM-dd @ hh:mm a");
    }


    return (
        <div className="w-[100%] min-h-screen">
            <div className="w-full h-[540px] flex">
                <Line data={data} options={options} />
                <div className="w-full">
                    <div className="w-full mt-8">
                        <div className=" items-center justify-between border-2 w-[250px] p-4 ml-2 rounded-lg">
                            <div className="flex items-center">
                                <div className="bg-teal-500 p-2 rounded-full">
                                    <FaWallet />
                                </div>
                                <span className="text-black ml-2">Total Revenue</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-black text-lg font-bold">Card Number</span>
                            </div>
                            <div className="text-black text-3xl font-bold">${total}</div>
                        </div>
                        <div className="bg-background border-2 w-full h-[300px] mt-4 ml-2 rounded-lg">
                            {transaction.map((trans) => {
                                const transactionTime = new Date(trans.transactionDate).toLocaleTimeString([], {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                });

                                return (

                                    <div key={trans.transactionId} className="flex justify-between items-center p-4">
                                        <div className="items-center gap-4">
                                            <div className="flex items-center gap-4">
                                                <img className="w-10 h-10 rounded-full" src="https://www.pngfind.com/pngs/m/317-3177131_636682202684372240-user-profile-photo-round-hd-png-download.png" alt="User Profile" />
                                                <h1 className="poetsen-one-regular">{trans.clientName}</h1>
                                            </div>
                                            <sub className="ml-14 poetsen-one-regular">{transactionTime}</sub>
                                        </div>
                                        <h1 className="text-orange-600 poetsen-one-regular">{user?.role =="FREELANCER" ? '+' : "-"} {(trans.transactionAmount) * 80}</h1>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-20">
                <table className="w-[90%] border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                Client Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                More Details
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transaction.map((transaction: Transaction, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
                                        <img src="https://www.pngfind.com/pngs/m/317-3177131_636682202684372240-user-profile-photo-round-hd-png-download.png" className="rounded-full h-10 w-12" alt="Client Picture" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800">
                                            {transaction.clientName}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatDateTime(transaction.transactionDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                    {(transaction.transactionAmount) * 80}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-md font-semibold rounded-full ${transaction.transactionStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {transaction.transactionStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Button variant="outlined" >View Details</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>


                {/* <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nexus Tax
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            <tr className="transition-all hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">Client 1</td>
                                <td className="px-6 py-4 whitespace-nowrap">Mar 1, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">$100</td>
                                <td className="px-6 py-4 whitespace-nowrap">$10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-green-500">Success</td>
                            </tr>
                            <tr className="transition-all hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">Client 2</td>
                                <td className="px-6 py-4 whitespace-nowrap">Mar 1, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">$100</td>
                                <td className="px-6 py-4 whitespace-nowrap">$10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-green-500">Success</td>
                            </tr>
                            <tr className="transition-all hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">Client 3</td>
                                <td className="px-6 py-4 whitespace-nowrap">Mar 1, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">$100</td>
                                <td className="px-6 py-4 whitespace-nowrap">$10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-red-500">Pending..</td>
                            </tr>
                            <tr className="transition-all hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">Client 4</td>
                                <td className="px-6 py-4 whitespace-nowrap">Mar 1, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">$100</td>
                                <td className="px-6 py-4 whitespace-nowrap">$10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-green-500">Success</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

            </div>
            <div>

            </div>
        </div >
    );
}

export default Payment;