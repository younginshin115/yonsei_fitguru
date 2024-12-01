import WorkoutNavigator from "./workout/WorkoutNavigator";

const Workout = () => {
    return (
        <section className="bg-bgColor min-h-screen p-8">
            <div className="max-w-6xl mx-auto text-center lg:mt-24 mt-16">
                <WorkoutNavigator />
            </div>
        </section>
    );
};

export default Workout;
