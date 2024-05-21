import { useEffect, useState } from 'react';
import { FaInfoCircle, FaRupeeSign, FaUsers, FaWallet } from 'react-icons/fa'
import AdminSideBar from './AdminSideBar'
import { Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { MdOutlineBlock } from "react-icons/md";
import Rating from '@mui/material/Rating';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axiosInstance from '@/Config/AxiosConfig/axiosConfig';
import freelancerProfile from "@/Interfaces/userInterface"
import clientProfile from "@/Interfaces/userInterface"


interface Transactions{
  transactionStatus:string;
  transactionAmount:number;
  clientName:string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashoBoard() {

  const [value, setValue] = useState<number | null>(2);
  const [freelancer, setFreelancer] = useState<freelancerProfile[]>([]);
  const [cleint, setClient] = useState<clientProfile[]>([]);
  const [lastTransaction, setLastTransaction] = useState<Transactions[]>([]);

  console.log(lastTransaction);
  

  useEffect(() => {
    const getFreelancer = async () => {
      const response = await axiosInstance.get("/api/v1/user/getTopFreelancer");

      setFreelancer(response.data);

    }
    getFreelancer();
  }, []);

  useEffect(() => {
    const getCleints = async () => {
      const response = await axiosInstance.get("/api/v1/user/getTopClients");

      setClient(response.data);

    }
    getCleints();
  }, [])

  useEffect(() => {
    const lastTransaction = async () => {
      const response = await axiosInstance.get("/api/v1/payment/getLastTransaction");

      setLastTransaction(response.data);

    }
    lastTransaction();
  }, [])


  const pieData = {
    labels: [
      'Client',
      'Freelancer',
      'Profit'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [1300, 700, 2000],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
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
      {
        label: 'Yearly Revenue',
        data: [5000, 17000, 10000, 12000, 20000, 20000, 25000, 31000, 26000, 24000, 28000, 18000],
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


  return (
    <AdminSideBar>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className='flex "w-full h-[500px] items-center gap-10'>
        <Line data={data} className='w-full h-full' options={options} />
        <Doughnut data={pieData} className='w-full h-full' />
      </div>

      <div className='flex  gap-10 mt-16'>

        <div className="flex flex-col bg-gray-100 w-[250px] rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-teal-500 text-white rounded-full p-2">
              <FaWallet size={20} color='black' />
            </div>
            <span className="text-gray-950 font-medium ml-2">Total Revenue</span>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-gray-700  text-sm">Monthly</span>
          </div>
          <div className="text-teal-500 text-3xl font-bold flex justify-end">$1500</div>
        </div>

        <div className="flex flex-col bg-gray-100 w-[250px] rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-teal-500 text-white rounded-full p-2">
              <FaRupeeSign size={20} color='black' />
            </div>
            <span className="text-gray-950 font-medium ml-2">Total Transaction Amount</span>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-gray-500 text-sm">Amount</span>
          </div>
          <div className="text-teal-500 text-3xl font-bold flex justify-end">$280</div>
        </div>

        <div className="flex flex-col bg-gray-100 w-[260px] rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-teal-500 text-white rounded-full p-2">
              <FaUsers size={20} color='black' />
            </div>
            <span className="text-gray-950 font-medium ml-2">Total Freelancers</span>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-gray-500 text-sm">Active Freelancers</span>
          </div>
          <div className="text-teal-500 text-3xl font-bold flex justify-end">750</div>
        </div>

        <div className="flex flex-col bg-gray-100 w-[250px] rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-teal-500 text-white rounded-full p-2">
              <FaUsers size={20} color='black' />
            </div>
            <span className="text-gray-950 font-medium ml-2">Total Clients</span>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-gray-500 text-sm">Active Clients</span>
          </div>
          <div className="text-teal-500 text-3xl font-bold flex justify-end">100</div>
        </div>

        <div className="flex flex-col bg-gray-100 w-[250px] rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-teal-500 text-white rounded-full p-2">
              <MdOutlineBlock size={20} color='black' />
            </div>
            <span className="text-gray-950 font-medium ml-2">Blocked User</span>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-gray-500 text-sm">Non-Active Users</span>
          </div>
          <div className="text-teal-500 text-3xl font-bold flex justify-end">10</div>
        </div>

      </div>

      <div className="w-full h-[350px] mt-20 flex gap-5 ">
        <div className="w-[40%] h-full bg-white shadow-lg rounded-lg">
          <h1 className="p-4 text-xl font-bold text-gray-800">Last Transactions</h1>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Client</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody>
              {lastTransaction.map((row:Transactions) => (
                <TableRow className='hover:bg-slate-100'>
                  <TableCell >
                    <div className="flex items-center">
                      <img
                        src={"https://github.com/shadcn.png"}
                        alt={row.clientName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {row.clientName}
                    </div>
                  </TableCell>
                  <TableCell>{row.transactionStatus}</TableCell>
                  <TableCell>{row.transactionAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-[400px] h-full bg-white shadow-lg rounded-lg">
          <h1 className="p-4 text-xl font-bold text-gray-800">Top Freelancers</h1>
          <div className="p-3">
            {freelancer.map((freelancer: freelancerProfile, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={freelancer.profileImgUrl}
                    alt={freelancer.userName}
                  />
                  <div>
                    <h1 className="text-sm font-semibold text-gray-800">
                      {freelancer.userName}
                    </h1>
                    <Rating
                      name="simple-controlled"
                      value={freelancer.rating}
                      disabled={true}
                      size="small"
                      precision={0.5}
                      className="text-yellow-500"
                    />
                  </div>
                </div>
                <div >
                  <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mb-1">
                    <span>{freelancer?.professionalRole}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end text-xs text-gray-500">
                    <span>{freelancer.country},{freelancer.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[400px] h-full bg-white shadow-lg rounded-lg">
          <h1 className="p-4 text-xl font-bold text-gray-800">Top Client</h1>
          <div className="p-3">
            {cleint.map((freelancer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={freelancer.profileImgUrl}
                    alt={freelancer.clientName}
                  />
                  <div>
                    <h1 className="text-sm font-semibold text-gray-800">
                      {freelancer.clientName}
                    </h1>
                    <Rating
                      name="simple-controlled"
                      value={freelancer.rating}
                      disabled={true}
                      size="small"
                      precision={0.5}
                      className="text-yellow-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mb-1">
                    <span>{freelancer.clientCountry}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end text-xs text-gray-500">
                    <span>{freelancer.clientCity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </AdminSideBar>
  )
}

export default AdminDashoBoard