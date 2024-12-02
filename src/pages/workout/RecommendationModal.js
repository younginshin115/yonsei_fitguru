import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { getUVfromCookie } from "../../hooks/useVisitorData";
import sendWorkoutRecommendationRequest from "./sendWorkoutRecommendationRequest";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const RecommendationModal = ({ currentDate, isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState("");

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);

            const addrScript = process.env.REACT_APP_ADDR_SCRIPT;

            // 현재 날짜 기반으로 주간 범위 계산
            const startDate = new Date(startOfWeek(currentDate, { weekStartsOn: 1 }));
            const endDate = new Date(endOfWeek(currentDate, { weekStartsOn: 1 }));

            try {
                const userId = getUVfromCookie();

                const response = await axios.get(
                    `${addrScript}?action=read&table=workout-history`, { maxRedirects: 5 }
                );

                const jsonpResponse = response.data;
                const jsonStart = jsonpResponse.indexOf("(") + 1;
                const jsonEnd = jsonpResponse.lastIndexOf(")");
                const jsonData = JSON.parse(jsonpResponse.substring(jsonStart, jsonEnd));

                if (jsonData.success) {
                    const workoutHistory = jsonData.data.filter((e) => {
                        const recordDate = new Date(e.date); // ISO 날짜를 Date 객체로 변환
                        return (
                            e.id === userId &&
                            recordDate >= startDate && recordDate <= endDate
                        );
                    });
                    const recommendations = await sendWorkoutRecommendationRequest(workoutHistory);

                    if (recommendations) {
                        setRecommendations(recommendations);
                        // 모달에 추천 결과 표시
                    }
                } else {
                    toast.error("운동 기록을 가져오지 못했습니다.");
                }
            } catch (error) {
                console.error("Error fetching recommendations:", error);
                toast.error("운동 추천을 받는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) fetchRecommendations();
    }, [isOpen]);

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
                <div
                    className="bg-white w-3/4 max-h-[80vh] rounded-lg shadow-lg p-6 overflow-y-auto"
                >
                    <h2 className="text-2xl font-semibold my-4"> <span className="mr-2 text-2xl">💪</span> 운동 추천</h2>
                    {loading ? (
                        <div className="text-gray-500">추천을 불러오는 중입니다...</div>
                    ) : (
                        <div className="text-textColor"><MarkdownRenderer markdownText={recommendations} /></div>
                    )}
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover"
                    >
                        닫기
                    </button>
                </div>
            </div>
        )
    );

};

export default RecommendationModal;
