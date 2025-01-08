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
        
        alert(`${response.data.message} \n ${response.data.otp}`)
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
      const response = await axios.patch(`${import.meta.env.VITE_SERVER_API_V1}/user/edituser`,{userId:user._id, formData},{withCredentials:true});

      if(response.status === 200) {
        
        // Update user context
        setUser({...user, ...formData, mobile: Number(formData.mobile)});
        setEditing(false);
        setShowOtpInput(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
    <div className="w-full max-w-lg p-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-primary to-primary/80">
          <div className="text-center">
            <h1 className="text-2xl font-playfair text-white mb-2">Manage Your Profile</h1>
            <p className="text-white/80">Edit your details or update your information</p>
          </div>
        </div>
  
        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-8 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              readOnly={!editing}
              className={`block w-full px-4 py-3 border rounded-lg ${editing ? 'border-blue-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
          </div>
  
          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                readOnly={!editing}
                className={`flex-1 px-4 py-3 border rounded-lg ${editing ? 'border-blue-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              />
              {editing && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>
  
          {/* OTP Input */}
          {showOtpInput && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 px-4 py-3 border rounded-lg border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
  
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={!editing}
              className={`block w-full px-4 py-3 border rounded-lg ${editing ? 'border-blue-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
          </div>
  
          {/* Buttons */}
          {editing ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setShowOtpInput(false);
                }}
                className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  </div>
  

  );
};

export default Profile;
