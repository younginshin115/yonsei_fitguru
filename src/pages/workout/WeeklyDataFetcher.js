import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, getDay } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { getUVfromCookie } from '../../hooks/useVisitorData';

const workoutTypeStyles = {
    가슴: "border border-[#3A86FF] text-[#3A86FF]",    // 밝은 강렬한 블루
    등: "border border-[#00C853] text-[#00C853]",      // 생기 있는 초록
    어깨: "border border-[#007BFF] text-[#007BFF]",    // 진한 블루
    팔: "border border-[#00E676] text-[#00E676]",      // 톡톡 튀는 연초록
    하체: "border border-[#0056D2] text-[#0056D2]",    // 깊은 블루
    복근: "border border-[#00BFA5] text-[#00BFA5]",    // 청량한 에메랄드 그린
};

const WeeklyDataFetcher = ({ currentDate }) => {
    const [weeklyData, setWeeklyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const addrScript = process.env.REACT_APP_ADDR_SCRIPT;

            // 현재 날짜 기반으로 주간 범위 계산
            const startDate = new Date(startOfWeek(currentDate, { weekStartsOn: 1 }));
            const endDate = new Date(endOfWeek(currentDate, { weekStartsOn: 1 }));

            try {
                const response = await axios.get(
                    `${addrScript}?action=read&table=workout-history`, { maxRedirects: 5 }
                );
                const jsonpResponse = response.data;
                const jsonStart = jsonpResponse.indexOf('(') + 1;
                const jsonEnd = jsonpResponse.lastIndexOf(')');
                const jsonData = JSON.parse(jsonpResponse.substring(jsonStart, jsonEnd));

                console.log(jsonData);

                if (jsonData.success) {
                    const userId = getUVfromCookie();
                    const filteredData = jsonData.data.filter((e) => {
                        const recordDate = new Date(e.date); // ISO 날짜를 Date 객체로 변환
                        return (
                            e.id === userId &&
                            recordDate >= startDate && recordDate <= endDate
                        );
                    });
                    setWeeklyData(filteredData || []);
                    toast.success("데이터를 성공적으로 가져왔습니다!");
                } else {
                    toast.error("데이터를 가져오지 못했습니다.");
                }
            } catch (error) {
                console.error("Error fetching weekly data:", error);
                toast.error("데이터를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentDate]); // currentDate가 변경될 때마다 실행



    // 요일별 데이터 그룹화 및 세트 정리
    const groupByDayAndExercise = (data) => {
        const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
        const grouped = {};

        // 모든 요일 기본 초기화
        days.forEach((day) => {
            grouped[day] = [];
        });

        data.forEach((item) => {
            const day = days[getDay(new Date(item.date)) - 1];
            if (!grouped[day]) grouped[day] = [];
            grouped[day].push(item);
        });

        // 같은 운동 이름으로 그룹화
        Object.keys(grouped).forEach((day) => {
            grouped[day] = grouped[day].reduce((acc, item) => {
                const existingExercise = acc.find(e => e.exercise_name === item.exercise_name);
                if (existingExercise) {
                    existingExercise.sets.push({ reps: item.reps || 1, weight: item.weight });
                } else {
                    acc.push({
                        workout_type: item.workout_type,
                        exercise_name: item.exercise_name,
                        sets: [{ reps: item.reps || 1, weight: item.weight }],
                    });
                }
                return acc;
            }, []);
        });

        return grouped;
    };

    const groupedData = groupByDayAndExercise(weeklyData);

    return (
        <div className="mt-8">
            {loading ? (
                <p className="text-gray-500">로딩 중...</p>
            ) : (
                Object.keys(groupedData).map((day) => (
                    <div key={day} className="mb-6">
                        <h3 className="text-left text-xl font-bold text-primary mb-4">{day}</h3>
                        {groupedData[day].length > 0 ? (
                            <ul className="space-y-4">
                                {groupedData[day].map((exercise, index) => (
                                    <li key={index} className="border p-4 rounded-lg shadow-md">
                                        {/* 운동 타입 태그 */}
                                        <div className="flex items-center mb-2">
                                            <span className={`w-12 px-2 py-1 text-xs font-semibold rounded-md ${workoutTypeStyles[exercise.workout_type]}`}>
                                                {exercise.workout_type}
                                            </span>
                                            <span className="ml-3 font-bold text-textColor">{exercise.exercise_name}</span>
                                        </div>
                                        {/* 세트 데이터 */}
                                        <ul className="ml-6 space-y-1">
                                            {exercise.sets.map((set, setIndex) => (
                                                <li
                                                    key={setIndex}
                                                    className="flex items-center text-gray-600 text-sm"
                                                >
                                                    <span
                                                        className="bg-gray-300 inline-block w-12 font-bold text-center rounded-lg mr-2"
                                                    >
                                                        {setIndex + 1}회
                                                    </span>
                                                    <span>{set.weight}kg</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-left">아직 운동 기록이 없습니다.</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default WeeklyDataFetcher;
