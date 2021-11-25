import PropTypes from 'prop-types';
import { profileBaseUrl } from '../../services/APIQueries';
import s from './AboutMovie.module.css';
export default function AboutMovie({ movie }) {
  return (
    <>
      <div className={s.wrapper}>
        <img
          src={
            movie.poster_path
              ? `${profileBaseUrl}${movie.poster_path}`
              : `SORRY, WE'VE GOT NO POSTER`
          }
          alt={movie.title}
          className={s.poster}
          width={300}
        />

        <div className={s.wrapperText}>
          <h2 className={s.title}>{movie.original_title || movie.name}</h2>
          <span>Vote average: {movie.vote_average}</span>
          <br />
          <span>Release Date: {movie.release_date}</span>
          <h3>Overview</h3>
          <span>{movie.overview}</span>
          <h3>Genres</h3>
          {<span>{movie.genres.map(genre => genre.name).join(', ')}</span>}
          <hr />
          <p>Additional information</p>
        </div>
      </div>
    </>
  );
}

AboutMovie.propTypes = {
  movie: PropTypes.object,
};
