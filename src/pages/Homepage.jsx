import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {Hero, WhyJoinUs, About} from '../components/homepage/Index';

const Homepage = () => {
    return(
        <>
        <Hero />
        <WhyJoinUs />
        <About />
        </>


    )
};

export default Homepage;