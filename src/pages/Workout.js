import { useState } from "react";
import WorkoutNavigator from "./workout/WeekSelector";
import WorkoutActions from "./workout/WorkoutActions";

const WeekSelector = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <section className="bg-white min-h-screen p-8">
            <div className="max-w-6xl mx-auto text-center lg:mt-24 mt-16">
                <WorkoutNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
                <WorkoutActions />
            </div>
        </section>
    );
};

export default WeekSelector;
