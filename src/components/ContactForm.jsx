import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    referral: '',
    message: '',
    privacyAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="contactform-page">
      <div className="contactform-container">
        <div className="contactform-left">
          <div className="contactform-logo-container">
            <div className="contactform-logo-circle"></div>
            <span className="contactform-logo-text">CONTACT</span>
          </div>
          <h1 className="contactform-heading">Contact Us Now.</h1>
        </div>

        <div className="contactform-right">
          <form onSubmit={handleSubmit}>
            <div className="contactform-form-group">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="FULL NAME *"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contactform-form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="EMAIL ADDRESS *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contactform-form-group">
              <div className="contactform-phone-input">
                <span className="contactform-country-code">+91</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="PHONE NUMBER *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contactform-form-group">
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  I AM INTERESTED IN THE FOLLOWING SERVICE *
                </option>
                <option value="web-development">Web Development</option>
                <option value="app-development">App Development</option>
                <option value="design">UI/UX Design</option>
                <option value="marketing">Digital Marketing</option>
                <option value="other">Other Services</option>
              </select>
            </div>

            <div className="contactform-form-group">
              <select
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  HOW DID YOU HEAR ABOUT US? *
                </option>
                <option value="search">Search Engine</option>
                <option value="social">Social Media</option>
                <option value="referral">Friend/Colleague</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="contactform-form-group">
              <textarea
                id="message"
                name="message"
                placeholder="MESSAGE (OPTIONAL)"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="contactform-form-footer">
              <div className="contactform-privacy-checkbox">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="privacy">
                  I HEREBY CONFIRM THAT I HAVE ACCEPTED THE PRIVACY POLICY.
                </label>
              </div>

              <button type="submit" className="contactform-submit-button">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;