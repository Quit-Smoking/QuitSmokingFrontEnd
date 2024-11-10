import './surveyresult.css';
import PropTypes from 'prop-types';

function SurveyResult({ relyStat, scoreImage, title, description }) {

  return (
    <div className="survey-result-container">
      <div className="survey-result-header">
        <p className="survey-result-p">니코틴 의존도 진단</p>
        <h2 className="survey-result-relyStat">{relyStat}</h2>
      </div>
      <section className="survey-result-section">
        <img
          src={scoreImage}
          alt="score result image"
          className="survey-result-image"
        />
        <div className="survey-result-text">
          <h3 className="survey-result-title">{title}</h3>
          <p className="survey-result-desc">{description}</p>
        </div>
      </section>
    </div>
  )
}

SurveyResult.propTypes = {
  relyStat: PropTypes.string,
  title: PropTypes.string,
  scoreImage: PropTypes.number,
  description: PropTypes.string,
};

export default SurveyResult;


// function BookItem({ imageUrl, title, author, description }) {

//   return (
//     <div className="book-item-container">
//       <div className="book-item-box">
//         <p className="book-item-title">《{title}》 {author}</p>
//         <p className="book-item-desc">{description}</p>
//       </div>
//       <div className="book-item-book">
//         <img src={imageUrl} alt={title} className="book-item-image"/>
//       </div>
//     </div>
//   )
// }

// BookItem.propTypes = {
//   imageUrl: PropTypes.string,
//   title: PropTypes.string,
//   author: PropTypes.string,
//   description: PropTypes.string,
// };

// export default BookItem;