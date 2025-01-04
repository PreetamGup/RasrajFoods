import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import  {useUserContext}  from "../../context/user.context";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface DashboardData {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  ordersByStatus: { _id: string; count: number }[];
  productsByCategory: { _id: string; count: number }[];
  popularProducts: { foodDetails: { name: string }[]; totalQuantity: number }[];
  usersByRole: { _id: string; count: number }[];
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate()    
  const {setUser} = useUserContext()
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_API_V1}/admin/dashboard`);
        setData(response.data);
      } catch (error:any) {

        if(error.response.status === 401 || 403){
            // Redirect to login page or show error message
            console.error("Unauthorized access to dashboard. Please login.");
            setUser({ fullName: '', mobile: 0, address: '', role: '', _id: '', orderHistory: [] })
            navigate('/login');
            return;
        }
        
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="container text-center text-lg font-medium mt-20">Loading...</div>;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const ordersByStatusData = {
    labels: data.ordersByStatus.map((status) => status._id),
    datasets: [
      {
        label: "Orders by Status",
        data: data.ordersByStatus.map((status) => status.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const revenueData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Total Revenue",
        data: [data.totalRevenue],
        backgroundColor: ["#4BC0C0"],
      },
    ],
  };

  const productsByCategoryData = {
    labels: data.productsByCategory.map((category) => category._id),
    datasets: [
      {
        label: "Products by Category",
        data: data.productsByCategory.map((category) => category.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const popularProductsData = {
    labels: data.popularProducts.map((product) => product.foodDetails[0].name),
    datasets: [
      {
        label: "Popular Products",
        data: data.popularProducts.map((product) => product.totalQuantity),
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF6384"],
      },
    ],
  };

  const usersByRoleData = {
    labels: data.usersByRole.map((role) => role._id),
    datasets: [
      {
        label: "Users by Role",
        data: data.usersByRole.map((role) => role.count),
        backgroundColor: ["#9966FF", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="dashboard container mx-auto px-5 py-6 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gradient">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Statistic Cards */}
        {[
          { label: "Total Orders", value: data.totalOrders, color: "bg-blue-500" },
          { label: "Total Revenue", value: `₹${data.totalRevenue.toFixed(2)}`, color: "bg-green-500" },
          { label: "Total Products", value: data.totalProducts, color: "bg-yellow-500" },
          { label: "Total Users", value: data.totalUsers, color: "bg-red-500" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`card p-4 shadow-md rounded-lg text-white ${stat.color} hover:scale-105 transition-transform`}
          >
            <h2 className="text-xl font-bold">{stat.label}</h2>
            <p className="text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: "Orders by Status", component: <Pie data={ordersByStatusData} options={chartOptions} /> },
          { title: "Total Revenue", component: <Bar data={revenueData} options={chartOptions} /> },
          { title: "Products by Category", component: <Doughnut data={productsByCategoryData} options={chartOptions} /> },
          { title: "Popular Products", component: <Bar data={popularProductsData} options={chartOptions} /> },
          { title: "Users by Role", component: <Pie data={usersByRoleData} options={chartOptions} /> },
        ].map((chart, index) => (
          <div key={index} className="card p-4 shadow-md rounded-lg hover:shadow-lg">
            <h2 className="text-xl font-bold mb-4">{chart.title}</h2>
            <div className="h-64">{chart.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
