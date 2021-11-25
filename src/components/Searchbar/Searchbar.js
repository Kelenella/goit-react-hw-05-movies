import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as Search } from '../../img/search.svg';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const history = useHistory();
  const location = useLocation();

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warning('Type something', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    history.push({ ...location, search: `query=${searchQuery}` });

    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <label>
          <input
            className={s.SearchForm__input}
            name="searchQuery"
            type="text"
            autoComplete="off"
            value={searchQuery}
            onChange={handleChange}
            autoFocus
            placeholder="Search movie"
          />
        </label>
        <button tton type="submit" className={s.SearchForm__button}>
          <Search width={13} height={13} />
        </button>
      </form>
      <ToastContainer
        autoClose={3000}
        position="top-center"
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
