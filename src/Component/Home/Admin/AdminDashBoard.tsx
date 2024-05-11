import { useState } from 'react';
import { FaInfoCircle, FaRupeeSign, FaUsers, FaWallet } from 'react-icons/fa'
import AdminSideBar from './AdminSideBar'
import { Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { MdOutlineBlock } from "react-icons/md";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";


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

  const freelancers = [
    {
      name: 'John Thomas',
      rating: 3,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
      jobTitle: 'UI/UX Designer',
      location: 'New York, USA',
      company: "SourceBeee"
    },
    {
      name: 'Emily Johnson',
      rating: 4,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      jobTitle: 'Web Developer',
      location: 'London, UK',
      company: "SourceBeee"
    },
    {
      name: 'Michael Davis',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      jobTitle: 'Digital Marketer',
      location: 'San Francisco, USA',
      company: "SourceBeee"
    },

  ];

  const demoData = [
    { key: "1", name: "Tony Reichert", amount: "10000", status: "Active" },
    { key: "2", name: "Zoey Lang", amount: "30200", status: "Paused" },
    { key: "3", name: "Jane Fisher", amount: "63000", status: "Active" },
    { key: "4", name: "William Howard", amount: "12020", status: "Vacation" },
  ];

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
            <span className="text-gray-950 font-medium ml-2">Subscribed Users</span>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-gray-500 text-sm">Premium Users</span>
          </div>
          <div className="text-teal-500 text-3xl font-bold flex justify-end">280</div>
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
              {demoData.map((row) => (
                <TableRow className='hover:bg-slate-100' key={row.key}>
                  <TableCell >
                    <div className="flex items-center">
                      <img
                        src={"https://github.com/shadcn.png"}
                        alt={row.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-[400px] h-full bg-white shadow-lg rounded-lg">
          <h1 className="p-4 text-xl font-bold text-gray-800">Top Freelancers</h1>
          <div className="p-3">
            {freelancers.map((freelancer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={freelancer.avatar}
                    alt={freelancer.name}
                  />
                  <div>
                    <h1 className="text-sm font-semibold text-gray-800">
                      {freelancer.name}
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
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <span>{freelancer.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{freelancer.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[400px] h-full bg-white shadow-lg rounded-lg">
          <h1 className="p-4 text-xl font-bold text-gray-800">Top Client</h1>
          <div className="p-3">
            {freelancers.map((freelancer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={freelancer.avatar}
                    alt={freelancer.name}
                  />
                  <div>
                    <h1 className="text-sm font-semibold text-gray-800">
                      {freelancer.name}
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
                    <span>{freelancer.company}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end text-xs text-gray-500">
                    <span>{freelancer.location}</span>
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