import React, { useState } from 'react';
import { Shield, Users, Mail, Phone, Building, CheckCircle, ArrowRight, Zap } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    message: '',
    services: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { id: 'email', label: 'Email Protection', icon: Mail },
    { id: 'phone', label: 'Phone/SMS Security', icon: Phone },
    { id: 'web', label: 'Web Threat Detection', icon: Shield },
    { id: 'training', label: 'Staff Training & Simulations', icon: Users },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-green-500/20 rounded-full border border-green-500/30">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-gray-300 mb-6">
          Your request has been received. Our PhishGuard AI team will contact you within 24 hours to discuss how we can protect your organization.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '', email: '', company: '', phone: '', employees: '', message: '', services: []
            });
          }}
          className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg border border-cyan-500/30 text-cyan-400 font-medium transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
            <Shield className="w-6 h-6 text-cyan-400" />
            <Building className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Contact Us – Partner with PhishGuard AI
        </h2>
        <p className="text-xl text-cyan-400 font-semibold mb-4">
          Protect Your Team. Stop Phishing Before It Starts.
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
          At PhishGuard AI, we specialize in AI-powered phishing prevention across email, phone, SMS, and web. 
          Whether you're a small business or a global enterprise, we're here to help your employees recognize 
          and respond to digital threats—before they click.
        </p>
      </div>

      {/* Value Proposition */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-5 h-5 text-cyan-400" />
          <span className="text-lg font-semibold text-white">Interested in bringing PhishGuard AI to your organization?</span>
        </div>
        <p className="text-gray-300 mb-6">
          Fill out the form below to connect with our team. We'll help you:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Deploy real-time phishing detection tools</h4>
              <p className="text-sm text-gray-400">across your workplace infrastructure</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Train your staff using LLM-powered</h4>
              <p className="text-sm text-gray-400">simulations and alerts</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Monitor suspicious emails, calls, and messages</h4>
              <p className="text-sm text-gray-400">from a centralized dashboard</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <ArrowRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Integrate with your existing</h4>
              <p className="text-sm text-gray-400">email clients, browsers, or mobile devices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="your.email@company.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Your Company Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Size
          </label>
          <select
            name="employees"
            value={formData.employees}
            onChange={handleInputChange}
            className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1,000 employees</option>
            <option value="1000+">1,000+ employees</option>
          </select>
        </div>

        {/* Services Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Services of Interest (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = formData.services.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceToggle(service.id)}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                      : 'bg-gray-900/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{service.label}</span>
                  {isSelected && <CheckCircle className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional Information
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 resize-none"
            placeholder="Tell us about your current security challenges, specific requirements, or any questions you have about PhishGuard AI..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.company}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Get Started with PhishGuard AI
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer Message */}
      <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span className="text-lg font-semibold text-white">Let's work together to make your business phishing-resistant.</span>
        </div>
        <p className="text-sm text-gray-400">
          Our security experts will contact you within 24 hours to discuss your specific needs and provide a customized solution.
        </p>
      </div>
    </div>
  );
};

export default ContactSection;