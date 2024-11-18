import { useNavigate } from 'react-router-dom';

const Overview = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    return (
        <section className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-6xl mx-auto text-center mt-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">FitGuru에 오신 걸 환영해요! 🎉</h1>
                <p className="text-lg text-gray-700 mb-12">
                    FitGuru는 당신만의 개인 피트니스 코치예요. <br />
                    운동 기록, 루틴 추천, 식단 상담까지, 다 해드릴게요! 💪
                </p>

                {/* 주요 기능 섹션 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* 통일된 카드 색상 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">운동 기록</h2>
                        <p className="text-gray-700">운동한 거 잊지 말고 기록해요! <br /> 나의 성장 과정을 확인하는 재미가 쏠쏠해요.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">운동 루틴 추천</h2>
                        <p className="text-gray-700">AI가 나만을 위한 운동 루틴을 짜드려요! <br /> 시간 아끼고 효율적으로 운동해요. 🔥</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">식단 상담</h2>
                        <p className="text-gray-700">뭐 먹을지 고민돼요? <br /> FitGuru가 딱 맞는 메뉴를 추천해줄게요. 🍎</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">체성분 상담</h2>
                        <p className="text-gray-700">체성분 데이터를 업로드하고, <br /> 더 나은 몸을 위한 조언을 받아보세요! 🧘</p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">지금 바로 시작해볼까요?</h3>
                    <p className="text-gray-700 mb-6">FitGuru와 함께라면 건강한 습관 만들기, 어렵지 않아요!</p>
                    <button
                        onClick={() => navigate('/contact')} // Contact 페이지로 이동
                        className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition-transform"
                    >
                        시작하기 🚀
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Overview;
