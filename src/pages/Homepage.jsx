import React, { useEffect, useState } from 'react';

import {Hero, WhyJoinUs, About} from '../components/homepage/Index';

const Homepage = ({searchType, setSearchType, searchQuery, setSearchQuery}) => {
    return(
        <>
        <Hero searchType={searchType} setSearchType={setSearchType} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <WhyJoinUs />
        <About />
        </>


    )
};

export default Homepage;