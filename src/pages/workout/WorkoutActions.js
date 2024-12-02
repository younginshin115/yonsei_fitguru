import { useState } from "react";
import WorkoutModal from "./WorkoutModal";
import axios from "axios";
import toast from "react-hot-toast";

const WorkoutActions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (data) => {
        const addrScript = process.env.REACT_APP_ADDR_SCRIPT;

        axios
            .get(`${addrScript}?action=insert&table=workout-history&data=${encodeURIComponent(JSON.stringify(data))}`)
            .then((response) => {
                console.log("Workout data sent successfully:", response.data);
                toast.success("운동 기록이 저장되었습니다!"); // 성공 메시지 Toast 표시
            })
            .catch((error) => {
                console.error("Failed to send workout data:", error);
                toast.error("운동 기록 저장에 실패했습니다."); // 오류 메시지 Toast 표시
            });
    };


    return (
        <div>
            <div className="grid grid-cols-2 gap-6 mt-8">
                {/* 운동 기록하기 버튼 */}
                <button
                    className="flex items-center justify-center p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform border border-primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="mr-3 text-2xl text-primary">🏋️‍♂️</span>
                    <span className="text-xl font-semibold text-primary">운동 기록하기</span>
                </button>

                {/* 운동 추천받기 버튼 */}
                <button className="flex items-center justify-center p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform border border-primary">
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
        </div>
    );
};

export default WorkoutActions;
