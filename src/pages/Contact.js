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
            setMessage({ type: 'error', content: '이메일이 유효하지 않아요! 😅' });
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

            setMessage({ type: 'success', content: '우와! 제출이 완료됐어요! 🙌 감사합니다!' });
            setFormData({ email: '', advice: '' });
        } catch (error) {
            setMessage({ type: 'error', content: '어머, 문제가 생겼어요! 😢 나중에 다시 시도해주세요.' });
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-screen bg-bgColor flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-lg w-full border border-primary">
                <h2 className="text-3xl font-extrabold text-primary mb-6">알림 받기</h2>
                <p className="text-textColor mb-4 text-left">서비스 런칭 시 알림을 받으실 이메일을 남겨주세요! 📧</p>

                <input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4 rounded border-primary"
                />

                <h3 className="text-textColor mb-4 text-left">서비스에 대한 의견이나 조언을 남겨주세요! 💡</h3>
                <textarea
                    id="advice"
                    placeholder="서비스에 대한 조언을 남겨주세요"
                    value={formData.advice}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4 rounded border-primary"
                ></textarea>

                <button
                    onClick={handleSubmit}
                    className={`w-full p-2 rounded text-bgColor flex justify-center items-center space-x-2 ${loading ? 'bg-gradient-to-r from-primary to-accent cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:bg-blue-600'}`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span>제출 중...</span>
                            <svg
                                className="animate-spin h-5 w-5 text-bgColor"
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
                        '제출하기 🚀'
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
