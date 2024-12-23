import { Routes, Route } from 'react-router-dom';
import Overview from '../pages/Overview';
import Workout from '../pages/Workout';
import Diet from '../pages/Diet';
import BodyComposition from '../pages/BodyComposition';
import Contact from '../pages/Contact';

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/body-composition" element={<BodyComposition />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
};

export default RouterConfig;
