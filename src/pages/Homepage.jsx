import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Homepage = () => {
    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/top-rated')
            .then(response => setTopRated(response.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="homepage">
            <header className="hero">
                <h1>Rate My Professors Clone</h1>
                <p>Find and rate your professors, and help others choose wisely!</p>
                <Link to="/search" className="cta-button">Start Searching</Link>
            </header>

            {/* Search Section */}
            <section className="search-section">
                <h2>Search for a Professor or College</h2>
                <form>
                    <input type="text" placeholder="Search by professor or college name..." />
                    <button type="submit">Search</button>
                </form>
            </section>

            {/* ... Other sections */}
            <section className="top-rated">
                <h2>Top-Rated Professors</h2>
                <div className="professor-cards">
                    {topRated.map(professor => (
                        <div className="card" key={professor.id}>
                            <h3>{professor.name}</h3>
                            <p>College: {professor.college}</p>
                            <p>Rating: {professor.rating}/5</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;