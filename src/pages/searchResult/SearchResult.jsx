import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then(
                (res) => {
                    setData(res);
                    setPageNum((prev) => prev + 1);
                    setLoading(false);
                    // console.log(data)
                }
            );
    };
    const fetchNextPageData = async () => {
        try {
            setLoading(true);
            const nextPageData = await fetchDataFromApi(
                `/search/multi?query=${query}&page=${pageNum}`
            );
            // console.log("nextPageData", nextPageData);
            setData((prevData) => {
                console.log(prevData)
                if (prevData?.data?.results) {
                    return {
                        ...prevData,
                        data: { ...prevData.data, results: [...prevData.data?.results, ...nextPageData.data?.results] },
                    };
                } else {
                    return nextPageData;
                }
            });
            setPageNum((prev) => prev + 1);
            setLoading(false);
            // console.log(pageNum);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        setPageNum(1);
        setData(null);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${data?.data?.total_results > 1 ? "results" : "result"} of '${query}' `}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            <img src={noResults} className="resultImage" alt="Result Not Found!" />
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
