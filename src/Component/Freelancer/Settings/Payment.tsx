import { Line } from "react-chartjs-2";
import { Button } from "@mui/material";
import { FaWallet } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Payment() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: [10000, 15000, 18000, 16000, 22000, 25000, 28000, 30000, 26000, 24000, 20000, 18000],
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

    return (
        <div className="w-[100%] min-h-screen">
            <div className="w-full h-[540px] flex">
                <Line data={data} options={options} />
                <div className="w-full">
                    <div className="w-full mt-8">
                        <div className=" items-center justify-between border-2 w-[250px] p-4 rounded-lg">
                            <div className="flex items-center">
                                <div className="bg-teal-500 p-2 rounded-full">
                                    <FaWallet />
                                </div>
                                <span className="text-black ml-2">Total Revenue</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-black text-lg font-bold">Card Number</span>
                            </div>
                            <div className="text-black text-3xl font-bold">$1500</div>
                        </div>

                        <div className="bg-background border-2 w-full h-[300px] mt-4 rounded-lg">
                            <div className="flex justify-between items-center p-4">
                                <div className=" items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <img className="w-10 h-10 rounded-full" src="https://www.pngfind.com/pngs/m/317-3177131_636682202684372240-user-profile-photo-round-hd-png-download.png" />
                                        <h1 className="poetsen-one-regular">Amrithesh A</h1>
                                    </div>
                                    <sub className="ml-14 poetsen-one-regular">3.40pm</sub>
                                </div>
                                <h1 className="text-orange-600 poetsen-one-regular ">+ 6000</h1>
                            </div>

                            <div className="flex justify-between items-center p-4">
                                <div className=" items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <img className="w-10 h-10 rounded-full" src="https://www.pngfind.com/pngs/m/317-3177131_636682202684372240-user-profile-photo-round-hd-png-download.png" />
                                        <h1 className="poetsen-one-regular">Amrithesh A</h1>
                                    </div>
                                    <sub className="ml-14 poetsen-one-regular">3.40pm</sub>
                                </div>
                                <h1 className="text-orange-600 poetsen-one-regular ">+ 6000</h1>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <div className=" items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <img className="w-10 h-10 rounded-full" src="https://www.pngfind.com/pngs/m/317-3177131_636682202684372240-user-profile-photo-round-hd-png-download.png" />
                                        <h1 className="poetsen-one-regular">Amrithesh A</h1>
                                    </div>
                                    <sub className="ml-14 poetsen-one-regular">3.40pm</sub>
                                </div>
                                <h1 className="text-orange-600 poetsen-one-regular ">+ 6000</h1>
                            </div>
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
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
                                    <img src="https://via.placeholder.com/150" className="rounded-full h-10 w-12" alt="Client Picture" />
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-800">
                                        Acme Corporation
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                2024-05-10 @ 10:00 AM
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                $1,200.00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-md font-semibold rounded-full bg-green-100 text-green-800">
                                    Pending
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Button variant="outlined">View Details</Button>
                            </td>
                        </tr>
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