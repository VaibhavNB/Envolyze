import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-green-900 text-gray-200 py-10 w-full relative bottom-0 right-0">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
                
                {/* About Us Section */}
                <div className="footer-about">
                    <h2 className="text-lg font-semibold mb-4">About Us</h2>
                    <p className="text-sm">
                        Our mission is to raise awareness about environmental conservation 
                        and promote sustainable practices for a greener future. Join us in making 
                        a positive impact on our planet!
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="footer-links">
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-green-300 transition">About Us</a></li>
                        <li><a href="/projects" className="hover:text-green-300 transition">Our Projects</a></li>
                        <li><a href="/blog" className="hover:text-green-300 transition">Blog</a></li>
                        <li><a href="/contact" className="hover:text-green-300 transition">Contact</a></li>
                        <li><a href="/donate" className="hover:text-green-300 transition">Donate</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-social">
                    <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                    <p className="text-sm mb-4">Stay connected for updates on our environmental initiatives.</p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="hover:text-green-300 transition">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="https://twitter.com" className="hover:text-green-300 transition">
                            <i className="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://instagram.com" className="hover:text-green-300 transition">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm mt-10 border-t border-green-700 pt-6">
                &copy; {new Date().getFullYear()} www.Envolyze.com | All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
