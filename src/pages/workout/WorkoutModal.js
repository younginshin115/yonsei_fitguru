import { useEffect, useState } from "react";
import { workoutTypes, exerciseOptions } from "./workoutOptions";
import { getUVfromCookie } from '../../hooks/useVisitorData';
import toast from "react-hot-toast"; // Toast 라이브러리 추가

const WorkoutModal = ({ isOpen, onClose, onSave }) => {
    const [workoutType, setWorkoutType] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [weight, setWeight] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setWorkoutType("")
            setExerciseName("")
            setWeight("")
        }
    }, [isOpen])

    const userId = getUVfromCookie(); // user_id 동적으로 설정

    const handleSave = () => {
        if (workoutType && exerciseName && weight) {
            const today = new Date();
            const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식으로 변환

            const data = {
                id: userId,
                workout_type: workoutType,
                exercise_name: exerciseName,
                weight: Number(weight),
                date: formattedDate, // 날짜 저장
                timestamp: today,
            };
            onSave(data);
            onClose();
        } else {
            toast.error("모든 필드를 입력해 주세요!"); // 필드 입력 오류 시 Toast 표시
        }
    };

    const handleExerciseNameFocus = () => {
        if (!workoutType) {
            toast.error("운동 부위를 먼저 선택해주세요!"); // 운동 부위 미선택 경고
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-primary mb-4">운동 기록하기</h2>

                {/* 운동 부위 선택 */}
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1 text-left p-1">
                        운동 부위
                    </label>
                    <select
                        className="w-full p-2 border rounded-lg text-gray-500"
                        value={workoutType}
                        onChange={(e) => {
                            setWorkoutType(e.target.value);
                            setExerciseName(""); // 운동 부위 변경 시 운동 종류 초기화
                        }}
                    >
                        <option value="" disabled hidden>
                            운동 부위를 선택하세요
                        </option>
                        {workoutTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 운동 종류 선택 */}
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1 text-left p-1">
                        운동 종류
                    </label>
                    <select
                        className="w-full p-2 border rounded-lg text-gray-500"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        onFocus={handleExerciseNameFocus} // 운동 부위 선택 확인
                        disabled={!workoutType} // 운동 부위가 선택되지 않으면 비활성화
                    >
                        <option value="" disabled hidden>
                            운동 종류를 선택하세요
                        </option>
                        {workoutType &&
                            exerciseOptions[workoutType].map((exercise) => (
                                <option key={exercise} value={exercise}>
                                    {exercise}
                                </option>
                            ))}
                    </select>
                </div>

                {/* 무게 입력 */}
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1 text-left p-1">
                        무게 (kg)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-lg"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="무게를 입력하세요"
                    />
                </div>

                {/* 버튼들 */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 rounded-lg transition ${workoutType && exerciseName && weight
                            ? "bg-primary text-white hover:bg-primaryHover"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        disabled={!workoutType || !exerciseName || !weight} // 조건부 비활성화
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutModal;
