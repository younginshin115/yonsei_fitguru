import { useState } from 'react';
import axios from 'axios';
import { getUVfromCookie } from '../hooks/useVisitorData';

const Contact = () => {
    const [formData, setFormData] = useState({ email: '', advice: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    const validateEmail = (email) => {
        const re = /^[\w.-]+@[\w.-]+\.[a-z]{2,4}$/i;
        return re.test(email);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        const { email, advice } = formData;
        setMessage({ type: '', content: '' });

        if (!validateEmail(email)) {
            setMessage({ type: 'error', content: 'Please provide a valid email address.' });
            return;
        }

        setLoading(true);

        try {
            const finalData = JSON.stringify({
                id: getUVfromCookie(),
                email,
                advice,
            });

            await axios.get(
                `${process.env.REACT_APP_ADDR_SCRIPT}?action=insert&table=feedback&data=${encodeURIComponent(finalData)}`
            );

            setMessage({ type: 'success', content: 'Thank you! Your submission has been received.' });
            setFormData({ email: '', advice: '' });
        } catch (error) {
            setMessage({ type: 'error', content: 'There was an issue submitting your information. Please try again later.' });
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
                <p className="mb-4 text-gray-600">
                    Leave your email to receive notifications when our service launches.
                </p>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4 rounded"
                />

                <h3 className="text-xl font-semibold mb-2">We value your feedback</h3>
                <p className="mb-4 text-gray-600">Tell us how we can improve our service.</p>
                <textarea
                    id="advice"
                    placeholder="Leave your feedback"
                    value={formData.advice}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4 rounded"
                ></textarea>

                <button
                    onClick={handleSubmit}
                    className={`w-full p-2 rounded text-white flex justify-center items-center space-x-2 ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span>Submitting...</span>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
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
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.28.805 4.374 2.152 6.052l3.848-2.761z"
                                ></path>
                            </svg>
                        </>
                    ) : (
                        'Submit'
                    )}
                </button>

                {message.content && (
                    <p className={`mt-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message.content}
                    </p>
                )}
            </div>
        </section>
    );
};

export default Contact;
