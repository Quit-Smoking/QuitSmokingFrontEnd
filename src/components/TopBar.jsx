import './topbar.css';
import PropTypes from 'prop-types';

const TopBar = ({ title, onBack }) => {
  
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <h1 className="top-bar-title">{title}</h1>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default TopBar;
