import React from "react";
import "./Footer.css";

const link_items = [
  "Bengaluru, India",
  "qestate@gmail.com",
  "+91 8752874568",
  "0213897349823",
];

const Footer = () => {
  return (
    <Footer className="footer-container">
      <div className="first-col">
        <h1 className="company-name">QEstate Homes</h1>
        <div className="company-description">
          If you use this site regularly and would like to help keep the site on
          the Internet, please consider donating a small sum to help pay for the
          hosting and bandwidth bill. There is no minimum donation, any sum is
          appreciated.
        </div>
      </div>
      <div className="second-col">
        <h1 className="link-header">Contact</h1>
        <ul className="link-items">
          {link_items.map((item,index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </Footer>
  );
};

export default Footer;
