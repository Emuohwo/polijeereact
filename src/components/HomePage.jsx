import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import votecounts from "../assets/images/votecounts.jpg";
import electronicvoting from '../assets/images/electronicvoting.jpg'
import vote from '../assets/images/vote.jpg'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <section id="home_banner">
                    <div className="home-content">
                    <h1 className="big_heading whiteColor">Electioneering</h1>
                    <h2 className="whiteColor">Decide Your next Leader</h2>
                    </div>
                </section>

                <section id="unique_features">
                    <ul className="features">
                        <li>
                            <img src={votecounts} alt="votecounts"/>
                            <h2>Transparency</h2>
                            <p>Everyone is free to monitor the process &nbsp;</p>
                        </li>
                        <li>
                            <img src={electronicvoting} alt="electronicvoting"/>
                            <h2>Timeliness</h2>
                            <p>There are no delays in declaring results &nbsp;</p>
                        </li>
                        <li>
                            <img src={vote} alt="vote"/>
                            <h2>Efficiency</h2>
                            <p>The process manages cost and time efficently</p>
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
}

export default HomePage;
