import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import MarkdownRenderer from "../components/MarkdownRenderer";

const Diet = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!query.trim()) {
            toast.error("질문을 입력해주세요!");
            return;
        }

        setLoading(true);
        setResponse("");

        const addrScript = process.env.REACT_APP_ADDR_SCRIPT;

        try {
            const result = await axios.get(
                `${addrScript}?action=generateText&inputMessage=${encodeURIComponent(query + ' 적절한 이모지를 추가해주세요. 호칭은 회원님으로 해주세요.')}`
            );

            const jsonpResponse = result.data;
            const jsonStart = jsonpResponse.indexOf("(") + 1;
            const jsonEnd = jsonpResponse.lastIndexOf(")");
            const jsonData = JSON.parse(jsonpResponse.substring(jsonStart, jsonEnd));

            if (jsonData.success) {
                setResponse(jsonData.data);
            } else {
                toast.error("답변을 가져오지 못했습니다.");
            }
        } catch (error) {
            console.error("Error fetching diet recommendation:", error);
            toast.error("답변을 받는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <section className="min-h-screen bg-white p-8">
            <div className="max-w-6xl mx-auto mt-24">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Diet</h1>
                    <p className="mt-4 text-lg text-textColor">
                        "오늘의 식단 선택"에 도움을 드립니다. 건강한 선택을 도와드릴게요! 🥑🍲
                    </p>
                </div>

                {/* Search Input */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="편하게 물어보세요! 갈비탕 먹어도 될까요? 마라탕이랑 떡볶이 중에 뭐 먹을까요?"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-full border border-primary rounded-lg py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition"
                    >
                        검색
                    </button>
                </div>

                {/* Response */}
                <div className="mt-4 border border-primary p-4 rounded-lg shadow-lg">
                    {loading ? (
                        <p className="text-gray-500">답변을 가져오는 중입니다...</p>
                    ) : response ? (<MarkdownRenderer markdownText={response} />) : (
                        <p className="text-gray-500">질문을 입력하시면 답변이 표시됩니다.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Diet;
