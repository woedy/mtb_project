import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const TermsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setErrorMessage(''); // Clear error when checkbox is checked
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isChecked) {
      setIsLoading(true); // Set loading to true
      setErrorMessage(''); // Clear error before submission

      // Simulate API request or loading delay
      setTimeout(() => {
        setIsLoading(false); // End loading state
        window.location.href = 'https://www.mtb.com/log-in'; // External navigation
      }, 2000); // 2 seconds delay (simulating request)
    } else {
      setErrorMessage('Please agree to the terms before proceeding.');
    }
  };

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section>
        <div className="grid grid-cols-1 gap-4">
          <div className="px-10 pt-4">
            <h1 className="text-3xl font-extrabold mb-6">Terms of agreement</h1>

            <p className="text-sm">
              By submitting this registration form, I understand that I am
              providing written instructions in accordance with the Fair Credit
              Reporting Act, Driver Privacy Protection Act, and other applicable
              law for M&B Bank and Intuit Inc. to request and receive
              information about me from third parties, including but not limited
              to a copy of my consumer credit report, score, and motor vehicle
              records from consumer reporting agencies, at any time for so long
              as I have an active M&B Bank account.
            </p>

            <p className="text-sm mt-5">
              I further authorize M&B Bank to retain a copy
              of my information for use in accordance with M&B Bank's
              <a href="#" className="underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline">
                Privacy Statement
              </a>
              .
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mt-7">
                <label className="flex gap-2 mb-10">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  I understand and agree
                </label>

                {/* Display the error message below the checkbox */}
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}

                <div className="mb-10">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer font-bold border border-darkgreen bg-darkgreen p-2 text-white transition hover:bg-opacity-90"
                    >
                    {isLoading ? (
                      <span className="flex justify-center">
                        {/* Loading Icon */}
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};


export default TermsPage;
