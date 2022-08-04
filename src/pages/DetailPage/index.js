import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from "../../api/axios";
export default function DetailPage() {

    const {movieId} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
      async function fetchData(){
        const request = await axios.get(`/movie/${movieId}`);
        console.log('request', request);
        setMovie(request.data);
      }
      fetchData();
    }, [movieId]);
    
    // 영화 정보 없을 시
    if(!movie) return <div>...loading</div>;

    return (
        <section>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt='poster' className='modal__poster-img'/>
        </section>
  )
}
