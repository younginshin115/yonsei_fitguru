import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDumbbell, faUtensils, faHeartbeat, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
    { path: '/', label: 'Overview', icon: faHome },
    { path: '/workout', label: 'Workout', icon: faDumbbell },
    { path: '/diet', label: 'Diet', icon: faUtensils },
    { path: '/body-composition', label: 'Body Composition', icon: faHeartbeat },
    { path: '/contact', label: 'Contact', icon: faEnvelope },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md fixed w-full z-10 lg:h-24 content-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div className="text-2xl font-bold text-gray-800">FitGuru</div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6">
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} className="text-gray-600 hover:text-primary flex items-center space-x-2">
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t border-gray-200">
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} className="block px-4 py-2 text-gray-600 hover:bg-gray-100 flex items-center space-x-2">
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
};

export default Header;
