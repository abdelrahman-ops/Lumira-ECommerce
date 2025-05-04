

import BestSeller from '../components/home/BestSeller';
import Hero from '../components/home/Hero';
import Latest from '../components/home/Latest';
import Sletter from '../components/home/Sletter';

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
