import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';

const UserManage = () => {

  interface User {
    _id: string;
    fullName: string;
    mobile: string;
    address: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const {setUser} = useUserContext()
  const navigate=useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_V1}/user/allUser`,
          { withCredentials: true }
        );

        setUsers(response.data.allUsers);
        setOriginalUsers(response.data.allUsers); // Store the original user list
        
      } catch (error:any) {
          if(error.response.status === 401 || 403){
            // Redirect to login page or show error message
            console.error("Unauthorized access to dashboard. Please login.");
            setUser({ fullName: '', mobile: 0, address: '', role: '', _id: '', orderHistory: [] })
            navigate('/login');
            return;
        }
        console.error('There was an error fetching the users!', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

    let searchTerm = e.target.value.toLowerCase(); 
    if (searchTerm === '') {
      // Reset to original user list when the search term is cleared
      setUsers(originalUsers);
    } else {
      // Filter users based on the search term
      let timeOutId;

     
      clearInterval(timeOutId); // Clear the previous timeout
      // Debounce the search input
       timeOutId = setTimeout(() => {
        searchTerm= searchTerm.length === 1? "" : searchTerm

        const filteredUsers = originalUsers.filter((user) =>
          user.fullName.toLowerCase().includes(searchTerm) || user.mobile.includes(searchTerm)
        );
        setUsers(filteredUsers);

      },500);
    }

  },[originalUsers]);


  return (
    <div className="container mx-auto px-5 py-3 h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-primary text-center mb-2">User Manage</h1>

      <input
        type="text"
        placeholder="Search users..."
        className="input input-bordered w-full max-w-xs mx-10 border-2 p-1 rounded"
        onChange={handleSearch}
      />

      <table className="table-auto w-full mt-5">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Id</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Mobile</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.mobile}</td>
              <td className="border px-4 py-2">{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;
