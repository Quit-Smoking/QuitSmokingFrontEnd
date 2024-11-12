import { useState } from "react";
import "./Shop.css";
import ShopExplain from "../../assets/Shop.svg";
import CloseIcon from "../../assets/close.svg";
import CheckIcon from "../../assets/check.svg";
import ItemExplain from "./ItemExplain";

function Shop() {
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("인기순");

  const sampleProducts = [
    {
      id: 1,
      name: "1+1 금연스티커 패치",
      price: "35,000원",
      image_url: "https://via.placeholder.com/150",
      description: "1+1 금연스티커 패치 금연 보조제 모션 스티커 30매입",
      rating: 4.5,
    },
    {
      id: 2,
      name: "특허상품 금연 스티커",
      price: "15,800원",
      image_url: "https://via.placeholder.com/150",
      description: "특허상품 금연 스티커 35p 보조제품 실제로 한달간 ...",
      rating: 4.0,
    },
    {
      id: 3,
      name: "니코틴 껌 세트",
      price: "20,000원",
      image_url: "https://via.placeholder.com/150",
      description: "니코틴 껌 세트로 금연을 도와드립니다.",
      rating: 4.2,
    },
    {
      id: 4,
      name: "금연 도움 니코틴 필름",
      price: "25,000원",
      image_url: "https://via.placeholder.com/150",
      description: "니코틴 필름으로 금연을 실천해보세요.",
      rating: 4.7,
    },
  ];

  const openExplainModal = () => setIsExplainOpen(true);
  const closeExplainModal = () => setIsExplainOpen(false);

  const openSortModal = () => setIsSortModalOpen(true);
  const closeSortModal = () => setIsSortModalOpen(false);

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    closeSortModal();
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>금연보조제</h1>
        <div className="shop-explain">
          <p>어떤 금연보조제가 도움이 될까요? </p>
          <img
            src={ShopExplain}
            alt="image"
            className="explainImg"
            onClick={openExplainModal}
          />
        </div>
      </header>
      <div className="bottomline"></div>
      <div className="itemtype">
        <p>전체</p>
        <p>니코틴 패치</p>
        <p>니코틴 껌·사탕</p>
        <p>니코틴필름</p>
      </div>
      <div className="itemtotal">
        <div>총 100개</div>
        <div onClick={openSortModal} className="sort-option">
          {sortOption} ▼
        </div>
      </div>
      <div className="product-grid">
        {sampleProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <div className="product-rating">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
          </div>
        ))}
      </div>
      {isExplainOpen && <ItemExplain onClose={closeExplainModal} />}
      {isSortModalOpen && (
        <div className="sort-modal">
          <div className="sortTitle">
            <h3>정렬</h3>
            <button onClick={closeSortModal} className="sort-modal-close">
              <img src={CloseIcon} alt="close" />
            </button>
          </div>

          <div className="sortlist">
            <div
              className={`list ${sortOption === "인기순" ? "selected" : ""}`}
              onClick={() => handleSortOptionClick("인기순")}
            >
              인기순{" "}
              {sortOption === "인기순" && <img src={CheckIcon} alt="check" />}
            </div>
            <div
              className={`list ${sortOption === "판매량순" ? "selected" : ""}`}
              onClick={() => handleSortOptionClick("판매량순")}
            >
              판매량순{" "}
              {sortOption === "판매량순" && <img src={CheckIcon} alt="check" />}
            </div>
            <div
              className={`list ${sortOption === "최신순" ? "selected" : ""}`}
              onClick={() => handleSortOptionClick("최신순")}
            >
              최신순{" "}
              {sortOption === "최신순" && <img src={CheckIcon} alt="check" />}
            </div>
            <div
              className={`list ${sortOption === "평점순" ? "selected" : ""}`}
              onClick={() => handleSortOptionClick("평점순")}
            >
              평점순{" "}
              {sortOption === "평점순" && <img src={CheckIcon} alt="check" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
