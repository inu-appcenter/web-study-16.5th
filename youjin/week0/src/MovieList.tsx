import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 영화 데이터를 위한 타입 정의
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=46991456a8e666d6d6af08d27caa6c9e&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Popular Movies</h1>
      <div style={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.id} style={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={styles.poster}
            />
            <h2 style={styles.movieTitle}>{movie.title}</h2>
            <p style={styles.overview}>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 스타일 정의 (React.CSSProperties 사용)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  movieGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  movieCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  poster: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  movieTitle: {
    fontSize: '1.2rem',
    margin: '10px 0',
    color: '#333',
  },
  overview: {
    fontSize: '0.9rem',
    color: '#666',
  },
};

export default MovieList;
