import { useState } from "react";
import WeekSelector from "./workout/WeekSelector";
import WorkoutActions from "./workout/WorkoutActions";
import WeeklyDataFetcher from "./workout/WeeklyDataFetcher";

const Workout = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <section className="bg-white min-h-screen p-8">
            <div className="max-w-6xl mx-auto text-center lg:mt-24 mt-16">
                <WeekSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />
                <WorkoutActions currentDate={currentDate} setCurrentDate={setCurrentDate} />
                <WeeklyDataFetcher currentDate={currentDate} />
            </div>
        </section>
    );
};

export default Workout;
