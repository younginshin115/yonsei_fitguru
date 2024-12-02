import axios from "axios";
import toast from "react-hot-toast";

const sendWorkoutRecommendationRequest = async (workoutHistory) => {
    const addrScript = process.env.REACT_APP_ADDR_SCRIPT;
    const inputMessage = generateInputMessage(workoutHistory);

    try {
        const response = await axios.get(`${addrScript}?action=generateText&inputMessage=${encodeURIComponent(inputMessage)}`)

        const jsonpResponse = response.data;

        const jsonStart = jsonpResponse.indexOf("(") + 1;
        const jsonEnd = jsonpResponse.lastIndexOf(")");
        const jsonData = JSON.parse(jsonpResponse.substring(jsonStart, jsonEnd));


        if (jsonData.success) {
            return jsonData.data;
        } else {
            toast.error("운동 추천 요청에 실패했습니다.");
            return null;
        }
    } catch (error) {
        console.error("Error sending workout recommendation request:", error);
        toast.error("운동 추천 요청 중 오류가 발생했습니다.");
        return null;
    }
};

const generateInputMessage = (workoutHistory) => {
    if (!workoutHistory || workoutHistory.length === 0) {
        return "운동 추천 부탁드려요. 이번주에는 아직 운동 기록이 없습니다. 적절한 이모지를 추가해주세요. 호칭은 회원님으로 해주세요.";
    }

    const formattedHistory = workoutHistory.map(
        (record) => `- ${record.date.split("T")[0]}: ${record.workout_type}, ${record.exercise_name}, ${record.weight}kg`
    ).join(" ");

    return `운동 추천 부탁드려요.  적절한 이모지를 추가해주세요. 호칭은 회원님으로 해주세요. 지난주 운동 기록:\n${formattedHistory}`;
};

export default sendWorkoutRecommendationRequest;
