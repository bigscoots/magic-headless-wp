import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-primary-600 dark:bg-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Have questions or want to learn more about our services? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Method 1 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:shadow-md text-center">
              <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                <Mail size={28} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Email Us</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Our friendly team is here to help
              </p>
              <a 
                href="mailto:info@magicheadlesswp.com" 
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                info@magicheadlesswp.com
              </a>
            </div>
            
            {/* Contact Method 2 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:shadow-md text-center">
              <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                <MapPin size={28} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Office</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Come visit our workspace
              </p>
              <address className="not-italic text-neutral-800 dark:text-neutral-200">
                123 Innovation Street<br />
                Tech Valley, CA 94043
              </address>
            </div>
            
            {/* Contact Method 3 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:shadow-md text-center">
              <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                <Phone size={28} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Phone</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Mon-Fri from 9am to 5pm
              </p>
              <a 
                href="tel:+15551234567" 
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Send Us a Message</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                We'll get back to you as quickly as possible
              </p>
            </div>
            
            {isSubmitted ? (
              <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-6 text-center">
                <div className="mb-4 mx-auto bg-success-100 dark:bg-success-900/40 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <MessageSquare size={28} className="text-success-600 dark:text-success-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-success-700 dark:text-success-300">Message Sent!</h3>
                <p className="text-success-600 dark:text-success-400">
                  Thank you for reaching out. We'll be in touch soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<Send size={18} />}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="h-[400px] relative bg-neutral-200 dark:bg-neutral-800">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101408.01909807266!2d-122.15130704654693!3d37.41331793538154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d6c154e6eaa5!2sPalo%20Alto%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1663271836664!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;