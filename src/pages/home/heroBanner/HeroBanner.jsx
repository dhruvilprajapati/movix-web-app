import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import useFetch from "../../../hooks/useFetch";
import "./style.scss"
import Img from "../../../components/lazyLoadImage/img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg =
            url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
        // console.log(bg);
    }, [data]);

    const seachQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }

    }
    const seachHandler = (e) => {
        if (query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className='heroBanner'>
            {!loading && <div className='backdrop-img'>
                <Img src={background} />
            </div>}
            <div className='opacity-layer'></div>
            <ContentWrapper>
                <div className='wrapper'>
                    <div className='heroBannerContent'>
                        <span className='title'>Welcome.</span>
                        <span className='subTitle'>Uncover a multitude of movies, TV shows, and fascinating personalities. Start exploring today.</span>
                        <div className='searchInput'>
                            <input
                                type="text "
                                placeholder='Search for a movie or Tv show...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={seachQueryHandler}
                            />
                            <button
                                onChange={(e) => setQuery(e.target.value)}
                                onClick={seachHandler}>
                                Search</button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
