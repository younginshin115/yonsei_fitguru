import { useState } from "react";
import WorkoutModal from "./WorkoutModal";
import RecommendationModal from "./RecommendationModal";
import axios from "axios";
import toast from "react-hot-toast";

const WorkoutActions = ({ currentDate, setCurrentDate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);

    const handleSave = (data) => {
        const addrScript = process.env.REACT_APP_ADDR_SCRIPT;

        axios
            .get(`${addrScript}?action=insert&table=workout-history&data=${encodeURIComponent(JSON.stringify(data))}`)
            .then((response) => {
                console.log("Workout data sent successfully:", response.data);
                setCurrentDate(new Date());
                toast.success("운동 기록이 저장되었습니다!");
            })
            .catch((error) => {
                console.error("Failed to send workout data:", error);
                toast.error("운동 기록 저장에 실패했습니다.");
            });
    };

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* 운동 기록하기 버튼 */}
                <button
                    className="flex items-center justify-center p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform border border-primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="mr-3 text-2xl text-primary">🏋️‍♂️</span>
                    <span className="text-xl font-semibold text-primary">운동 기록하기</span>
                </button>

                {/* 운동 추천받기 버튼 */}
                <button
                    className="flex items-center justify-center p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform border border-primary"
                    onClick={() => setIsRecommendationModalOpen(true)}
                >
                    <span className="mr-3 text-2xl text-primary">💡</span>
                    <span className="text-xl font-semibold text-primary">운동 추천받기</span>
                </button>
            </div>
            {/* 운동 기록 모달 */}
            <WorkoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />

            {/* 운동 추천 모달 */}
            <RecommendationModal
                currentDate={currentDate}
                isOpen={isRecommendationModalOpen}
                onClose={() => setIsRecommendationModalOpen(false)}
            />
        </div>
    );
};

export default WorkoutActions;
