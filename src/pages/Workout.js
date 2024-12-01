import { useState } from "react";
import WorkoutNavigator from "./workout/WeekSelector";

const WeekSelector = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <section className="bg-bgColor min-h-screen p-8">
            <div className="max-w-6xl mx-auto text-center lg:mt-24 mt-16">
                <WorkoutNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
            </div>
        </section>
    );
};

export default WeekSelector;
