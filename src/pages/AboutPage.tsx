import React from 'react';
import { Users, Zap, ShieldCheck, Coffee } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-primary-600 dark:bg-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              About Magic Headless WP
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              We're passionate about creating the next generation of WordPress experiences
              through modern, headless architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                <p>
                  Magic Headless WP began with a simple question: "What if WordPress could be even better?" As web developers who loved WordPress but were frustrated by its performance limitations, we set out to create a solution that would combine the best of both worlds.
                </p>
                <p>
                  Founded in 2023 by a team of passionate developers and WordPress enthusiasts, our mission has been to help businesses leverage the power of WordPress as a headless CMS while providing lightning-fast, secure, and modern frontends for their visitors.
                </p>
                <p>
                  Today, we're proud to offer a comprehensive headless WordPress and WooCommerce solution that empowers businesses to create exceptional digital experiences without compromising on content management flexibility or performance.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Values</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                <Zap size={28} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Innovation</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                We continuously explore new technologies and approaches to push the boundaries of what's possible with WordPress.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                <Users size={28} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Community</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                We believe in giving back to the open-source community and fostering collaboration among developers.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                <ShieldCheck size={28} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Quality</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                We're committed to delivering exceptional experiences through clean code, thorough testing, and attention to detail.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                <Coffee size={28} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Balance</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                We value work-life balance and believe that well-rested, happy team members create better products.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Meet Our Team</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              The talented individuals behind Magic Headless WP
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="John Doe" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-medium text-lg">John Doe</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">Founder & CTO</p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  WordPress developer with 10+ years of experience and a passion for modern web technologies.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Jane Smith" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-medium text-lg">Jane Smith</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">CEO</p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Strategic leader with a background in digital transformation and e-commerce.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <img 
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Mike Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-medium text-lg">Mike Johnson</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">Lead Developer</p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Frontend specialist with expertise in React and modern JavaScript frameworks.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <img 
                  src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Sarah Lee" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-medium text-lg">Sarah Lee</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">UX Designer</p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  User experience expert focused on creating intuitive and delightful interfaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-50 dark:bg-primary-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Transform Your WordPress Experience?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Let's work together to create an exceptional digital experience for your users.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;