

import BestSeller from '../components/BestSeller';
import Hero from '../components/Hero';
import Latest from '../components/Latest';
import Sletter from '../components/Sletter';

const Home = () => {
    return(
        <div>
            <Hero />
            <Latest />
            <BestSeller />
            <Sletter />
        </div>

    );
    
};

export default Home;
