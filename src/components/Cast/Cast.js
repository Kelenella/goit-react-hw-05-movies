import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieAPI from '../../services/APIQueries';
import onScroll from '../../helpers/Scroll';
import { castBaseUrl } from '../../services/APIQueries';
import s from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    MovieAPI.getCastsMovies(movieId)
      .then(res => {
        setCast(res);
        onScroll();
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);

  return (
    <div>
      {cast && cast.length > 0 ? (
        <ul className={s.castList}>
          {cast.map(({ id, original_name, profile_path }) => (
            <li key={id} className={s.castItem}>
              <img
                src={
                  profile_path
                    ? `${castBaseUrl}${profile_path}`
                    : `No information :(`
                }
                alt={original_name}
                width={100}
              />

              <p className={s.castName}>{original_name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We have no information about the cast.</p>
      )}
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string,
};

export default Cast;
