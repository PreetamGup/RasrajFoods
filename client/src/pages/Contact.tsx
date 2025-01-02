import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair text-secondary mb-8 text-center">
          Contact Us
        </h1>

        {/* Introductory Description */}
        <div className="mb-12 text-gray-700 text-lg leading-relaxed text-center">
          <p>
            Have a question, feedback, or a craving for our delicacies? We’re here to help! 
            Our team is passionate about serving you the best snacks, sweets, and cakes 
            with unparalleled customer service. Whether it's about placing an order, 
            a special request, or just saying hello, we’d love to hear from you.
          </p>
          <p className="mt-4">
            Reach out to us using the contact details below or connect with us on social media. 
            Let’s make your experience with Rasraj even sweeter!
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <div>
            <p>
              <span className="font-semibold text-primary">Address:</span> 
              123 Sweet Street, Foodie Town, India
            </p>
            <p>
              <span className="font-semibold text-primary">Phone:</span> 
              +91 98765 43210
            </p>
            <p>
              <span className="font-semibold text-primary">Email:</span> 
              contact@rasrajfoods.com
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8">
          <h2 className="text-2xl font-playfair text-secondary text-center mb-4">
            Connect with Us on Social Media
          </h2>
          <p className="text-gray-700 text-center mb-6">
            Follow us for the latest updates, special offers, and mouth-watering posts about 
            our delicacies. Don’t forget to tag us in your Rasraj experience!
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://www.instagram.com/rasrajfoods" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-secondary transition-colors"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a 
              href="https://x.com/rasrajfoods" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-secondary transition-colors"
            >
              <Twitter className="w-8 h-8" />
            </a>
            <a 
              href="https://www.facebook.com/rasrajfoods/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-secondary transition-colors"
            >
              <Facebook className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Message Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-playfair text-secondary text-center mb-6">
            Send Us a Message
          </h2>
          <p className="text-gray-700 text-center mb-8">
            If you have a specific query or want to share your feedback, please fill out 
            the form below. Our team will get back to you at the earliest.
          </p>
          <form className="space-y-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              rows={5}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Closing Note */}
        <div className="mt-16 text-center text-gray-600">
          <p>
            Thank you for choosing Rasraj Foods! We look forward to serving you with our 
            delightful treats and exceptional service.
          </p>
        </div>
      </div>
    </div>
  );
}
