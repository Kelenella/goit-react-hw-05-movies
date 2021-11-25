import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieAPI from '../../services/APIQueries';
import onScroll from '../../helpers/Scroll';
import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    MovieAPI.getReviewsMovies(movieId)
      .then(res => {
        setReviews(res);
        onScroll();
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h2>{author}</h2>
              <p className={s.reviewText}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have reviews for this movie.</p>
      )}
    </>
  );
}
