import PropTypes from "prop-types";
import "./ItemExplain.css";

function ItemExplain({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>나에게 맞는 보조제는?</h2>
        <p>금연보조제는 니코틴 의존을 줄이는데 도움이 됩니다.</p>
        <div className="borderbottom"></div>

        <div className="explanation-section">
          <p className="color-text">급단현상이 심하다면</p>
          <h3>니코틴 패치</h3>
          <p>
            니코틴 패치는 기상 직후부터 흡연 욕구가 강하고 금단 현상이 심한
            흡연자에게 적합한 제품이며, 니코틴 패치는 지속적으로 일정한 농도의
            니코틴을 공급해준다는 특징이 있어요.
          </p>
          <div className="borderbottom"></div>
        </div>

        <div className="explanation-section">
          <p className="color-text">충동적인 흡연자라면</p>
          <h3>니코틴 껌·사탕</h3>
          <p>
            흡연 욕구가 충동적으로 발생하는 흡연자라면 니코틴 껌 또는 니코틴
            사탕을 추천합니다. 이러한 제품은 즉시 효과가 빠르게 나타나며, 니코틴
            겔은 흡연 욕구가 있을 때마다 하루 최대 30분 동안 천천히 씹도록
            합니다.
          </p>
          <div className="borderbottom"></div>
        </div>

        <div className="explanation-section">
          <p className="color-text">니코틴 의존성이 낮다면</p>
          <h3>니코틴 필름</h3>
          <p>
            니코틴 의존성이 낮은 흡연자에게는 니코틴 구강용 해소제가 적합합니다.
            사용 시 6주간 하루 12개 이하로 사용하며 점차 줄여 나갑니다. 하루
            12개 이하로 사용하며 점차 줄여 나가며, 사용 시 1~2개까지 점차
            줄여나가며 효과를 볼 수 있습니다.
          </p>
        </div>

        <button onClick={onClose} className="close-button">
          닫기
        </button>
      </div>
    </div>
  );
}

ItemExplain.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ItemExplain;
