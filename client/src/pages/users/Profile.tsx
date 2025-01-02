import { useState } from 'react';
import { useUserContext } from '../../context/user.context';
import axios from 'axios';

const Profile = () => {
  const { user, setUser } = useUserContext(); // Assuming `setUser` function updates the user in context and backend
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    mobile: user.mobile.toString(),
    address: user.address,
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendOtp = async () => {
    try {
      if (formData.mobile.toString().length === 10) {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/generateOtp`, { mobile: formData.mobile });
        console.log(response.data.message, response.data.otp);
        setShowOtpInput(true);
      } else {
        alert('Please enter a valid 10-digit mobile number.');
      }
    } catch (error:any) {
      if (error.response.status === 400) {
        alert(`${error.response.data}`);
      } else {
        console.error(error.response.data);
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/user/verifyOtp`, { mobile: formData.mobile, otp });
      if (response.status === 200) {
        alert("Mobile verified")
        setOtp('')
        handleSave();
      } else {
        alert('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Send update request to the backend
    //   await fetch('/api/update-profile', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

      // Update user context
      setUser({...user, ...formData, mobile: Number(formData.mobile)});
      setEditing(false);
      setShowOtpInput(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form className="max-w-lg mx-auto bg-orange-100 shadow-md rounded-md p-6 my-20">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          readOnly={!editing}
          className={`w-full px-4 py-2 border rounded-md ${editing ? 'border-blue-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          readOnly={!editing}
          className={`w-full px-4 py-2 border rounded-md ${editing ? 'border-blue-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
        />
        {editing && (
          <button
            type="button"
            onClick={handleSendOtp}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Send OTP
          </button>
        )}
      </div>
      {showOtpInput && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={handleVerifyOtp}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Verify OTP
          </button>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          readOnly={!editing}
          className={`w-full px-4 py-2 border rounded-md ${editing ? 'border-blue-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
        />
      </div>
      {editing ? (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setShowOtpInput(false);
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Edit
        </button>
      )}
    </form>
  );
};

export default Profile;
