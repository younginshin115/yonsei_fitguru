import { useState } from 'react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

const WeekSelector = ({ currentDate, setCurrentDate }) => {
    const [view, setView] = useState('weekly'); // 현재 선택된 뷰 (주간: 'weekly', 월간: 'monthly')

    const getWeekRange = (date) => {
        const start = startOfWeek(date, { weekStartsOn: 1 });
        const end = endOfWeek(date, { weekStartsOn: 1 });
        return `${format(start, 'M월 d일')} - ${format(end, 'M월 d일')}`;
    };

    const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
    const handleThisWeek = () => setCurrentDate(new Date());


    // 월간 뷰 버튼 클릭 시
    const handleMonthlyView = () => {
        toast.error('월간 뷰는 아직 지원되지 않습니다. 😅', {
            duration: 3000, // 3초 후 사라짐
            position: 'top-center',
        });
    };

    // 주간 뷰 버튼 클릭 시
    const handleWeeklyView = () => setView('weekly');

    return (
        <section className="md:flex justify-between bg-white">
            {/* Toast Container */}
            <Toaster />

            <div className="flex items-center justify-center max-w-4xl">
                {/* 월간 뷰 버튼 */}
                <button
                    onClick={handleMonthlyView}
                    className={`border border-rightGray rounded-l-full p-2 pl-4 font-semibold transition ${view === 'monthly'
                        ? 'border-primary bg-primary text-white'
                        : 'border-rightGray bg-white text-textColor hover:bg-primary hover:text-white hover:border-primary'
                        }`}
                >
                    월간 보기
                </button>
                {/* 주간 뷰 버튼 */}
                <button
                    onClick={handleWeeklyView}
                    className={`border rounded-r-full p-2 pr-4 font-semibold transition ${view === 'weekly'
                        ? 'border-primary bg-primary text-white'
                        : 'border-rightGray bg-white text-textColor hover:bg-primary hover:text-white hover:border-primary'
                        }`}
                >
                    주간 보기
                </button>
            </div>
            {/* 주간 선택기 */}
            <div className="flex items-center justify-center p-2 px-4">
                <button
                    onClick={handlePrevWeek}
                    className="p-2 text-primary font-semibold hover:text-primaryHover transition"
                >
                    ◀
                </button>
                <span className="mx-4 text-lg text-gray-800">
                    {getWeekRange(currentDate)}
                </span>
                <button
                    onClick={handleNextWeek}
                    className="p-2 text-primary font-semibold hover:text-primaryHover transition"
                >
                    ▶
                </button>
            </div>
            <div className='p-2'>
                {/* 이번 주 버튼 */}
                <button
                    onClick={handleThisWeek}
                    className="border border-rightGray rounded-full p-2 px-4 bg-white text-textColor hover:text-white font-semibold hover:bg-primary hover:border-primary transition"
                >
                    이번 주
                </button>
            </div>
        </section>
    );
};

export default WeekSelector;
