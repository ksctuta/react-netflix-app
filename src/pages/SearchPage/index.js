import React, { useState, useEffect } from 'react'
import axios from "../../api/axios";
import "./SearchPage.css";
import { useLocation, useNavigate} from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {

    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);

    // useLocation 콘솔 확인
    // console.log('useLocation()', useLocation());

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // url param 콘솔 확인
    //console.log(searchTerm);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        // Debounce 확인용 콘솔
        console.log("searchTerm", searchTerm);
        try {
            const request = await axios.get(
                `/search/multi?include_adult=true&query=${searchTerm}`
            )
            console.log(request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                if (movie.backdrop_path !== null && movie.media_type !== "person") {
                    const movieImageUrl =
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                    return (
                        <div className='movie'>
                            <div className='movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
                                <img src={movieImageUrl} alt="movie" className='movie__poster'></img>
                            </div>
                        </div>
                    )
                }
                })}
            </section>
        ) : (
        <section className='no-results'>
            <div className='no-result__text'>
                <p>찾고자 하는 검색어 "{debouncedSearchTerm}" 에 맞는 영화가 없습니다.</p>
            </div>
        </section>
        )
    }
    
    return renderSearchResults();
}
