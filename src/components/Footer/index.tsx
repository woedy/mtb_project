// Footer.js
import React from 'react';
import equalHousingLender from '../../images/icon/mtb-equalhousinglender.svg';
import entrust from '../../images/icon/mtb-entrust.svg';
const Footer = () => {
  return (
    <footer className="bg-graylight p-10">
      <div className="flex gap-3 justify-center">
        <p className="text-center text-[10px] leading-tight">
          ©2024 M&T Bank. All Rights Reserved.<br />
          Users of this website agree to be bound by the provisions of the M&T website <span className="text-green">Terms of Use</span> and <span className="text-green">Privacy Policy</span>.
        </p>
      </div>
      <div className="flex gap-3 items-center justify-center mt-5">
        <img
          src={equalHousingLender}
          width="30"
          height="25"
          alt="Equal Housing Lender"
        />
        <img
          src={entrust}
          width="90"
          height="25"
          alt="Entrust"
        />
      </div>
      <p className="text-center text-[10px] leading-tight mt-5">
        Equal Housing Lender. NMLS #381076<br />
        <span className="text-green">Member FDIC</span>.
      </p>
    </footer>
  );
};

export default Footer;
