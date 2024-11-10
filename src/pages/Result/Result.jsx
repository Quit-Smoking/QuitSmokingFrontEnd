import './result.css';
import logo from '../../assets/logo_letters.svg';
import highRelyImage from '../../assets/rely/high_rely.svg';
import mediumRelyImage from '../../assets/rely/medium_rely.svg'
import lowRelyImage from '../../assets/rely/low_rely.svg';
import SurveyResult from './SurveyResult';

function Result() {
  let tempStatNum = 26; //! api 받아올 것

  const relyStatText = tempStatNum > 25 ? '높은 의존도' : tempStatNum > 15 ? '중간 정도의 의존도' : '낮은 의존도';
  const relyImage = tempStatNum > 25 ? highRelyImage : tempStatNum > 15 ? mediumRelyImage : lowRelyImage;
  const title = tempStatNum > 25 ? '니코틴에 대한 의존이 생긴 상태' : tempStatNum > 15 ? '니코틴 중독 증상이 나타나지 않는 상태' : '니코틴 의존도가 아주 낮은 상태';
  const description = tempStatNum > 25 ? `니코틴이 몸에서 빠져나가 현중 농도가 떨어지면 금단증상을 경험하게 됩니다. 담배를 끊기 어려운 이유는 금단증상과 내 마음이 뒤섞여 버려 생활의 일부가 되어버리기 때문입니다. 감자기 담배를 중단하기보단 니코틴 패치 등 금연보조기구를 적절히 사용하는 것을 추천합니다.` : tempStatNum > 15 ? "현재 니코틴 중독으로 인한 구체적 증상은 나타나지 않습니다. 장기간 흡연은 니코틴의 의존도를 높힙니다. 아직은 큰 고통 없이 담배를 끊을 수 있습니다. 잠재적인 중독의 위험성과 건강에 해가 된다는 점을 생각하면 지금이 바로 금연을 시작해야할 시기인 것입니다." : "니코틴 의존도는 흡연량이 많아지거나 흡연한 시간이 길 수록 높아집니다. '나는 얼마 안 피니까 괜찮아'라고 생각할 수 있지만, 나중에 금연하는 것은 지금보다 훨씬 힘들 것입니다. 가장 쉽게 금연할 수 있는 때가 바로 지금입니다. 니코틴 의존도가 늘어가기 전에 지금 바로 완전 금연하세요!";

  return (
    <div className="result-container">
      <div className="result-header">
        <img
          src={logo}
          alt="숨쉴래 로고"
          className="result-logo"
        />
      </div>
      <SurveyResult
        relyStat={`${relyStatText}`}
        scoreImage={relyImage}
        title={title}
        description={description}
      />
      <button className="result-button">금연 시작하기</button>
    </div>
  )
}

export default Result;
