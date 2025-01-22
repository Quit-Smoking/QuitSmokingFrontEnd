import { useState, useEffect } from "react";
import axios from "axios";
import "./Shop.css";
import ShopExplain from "../../assets/Shop.svg";
import CloseIcon from "../../assets/close.svg";
import CheckIcon from "../../assets/check.svg";
import ItemExplain from "./ItemExplain";
import Nav from "../../components/nav";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Shop() {
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("인기순");
  const [products, setProducts] = useState([]); // 서버에서 가져온 데이터를 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 카테고리
  const [keywordId, setKeywordId] = useState(null); // 선택된 카테고리의 keywordId

  // API 호출 함수
  const fetchProducts = async (keywordId) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint =
        keywordId === null
          ? `${backendUrl}/store/show_all_products` // 전체 상품 API
          : `${backendUrl}/store/show_products_by_keyword`; // 키워드별 상품 API

      const params = keywordId !== null ? { keyWordId: keywordId } : {};

      const response = await axios.get(endpoint, { params });
      if (response.data && response.data.productData) {
        setProducts(response.data.productData); // 서버에서 받은 데이터 저장
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("상품 데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 클릭 이벤트
  const handleCategoryClick = (category, id) => {
    setSelectedCategory(category); // 선택된 카테고리 저장
    setKeywordId(id); // 선택된 키워드 ID 저장
    fetchProducts(id); // API 호출
  };

  // 컴포넌트 초기 렌더링 시 전체 상품 로드
  useEffect(() => {
    fetchProducts(null); // 전체 상품 로드
  }, []);

  const openExplainModal = () => setIsExplainOpen(true);
  const closeExplainModal = () => setIsExplainOpen(false);

  const openSortModal = () => setIsSortModalOpen(true);
  const closeSortModal = () => setIsSortModalOpen(false);

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    closeSortModal();
  };

  // 별점 생성 함수
  const renderStars = (rank) => {
    const fullStars = Math.floor(rank); // 전체 별
    const emptyStars = 5 - fullStars; // 빈 별
    return "★".repeat(fullStars) + "☆".repeat(emptyStars);
  };

  return (
    <div className="full_container">
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
          <p
            className={selectedCategory === "전체" ? "selected-category" : ""}
            onClick={() => handleCategoryClick("전체", null)}
          >
            전체
          </p>
          <p
            className={
              selectedCategory === "니코틴 패치" ? "selected-category" : ""
            }
            onClick={() => handleCategoryClick("니코틴 패치", 0)}
          >
            니코틴 패치
          </p>
          <p
            className={
              selectedCategory === "니코틴 껌·사탕" ? "selected-category" : ""
            }
            onClick={() => handleCategoryClick("니코틴 껌·사탕", 1)}
          >
            니코틴 껌·사탕
          </p>
          <p
            className={
              selectedCategory === "니코틴필름" ? "selected-category" : ""
            }
            onClick={() => handleCategoryClick("니코틴필름", 2)}
          >
            니코틴필름
          </p>
        </div>
        <div className="itemtotal">
          <div>총 {products.length}개</div>
          <div onClick={openSortModal} className="sort-option">
            {sortOption} ▼
          </div>
        </div>
        <div className="product-grid">
          {isLoading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            products.map((product, index) => (
              <div
                key={index}
                className="product-card"
                onClick={() => window.open(product.productUrl, "_blank")}
              >
                <img
                  src={
                    product.productImageUrl || "https://via.placeholder.com/150"
                  }
                  alt={product.productName}
                  className="product-image"
                />
                <p className="product-description">{product.productName}</p>
                <p className="product-price">{product.productPrice}</p>
                <div className="product-rating">
                  {renderStars(product.rank)}
                </div>
              </div>
            ))
          )}
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
                className={`list ${
                  sortOption === "판매량순" ? "selected" : ""
                }`}
                onClick={() => handleSortOptionClick("판매량순")}
              >
                판매량순{" "}
                {sortOption === "판매량순" && (
                  <img src={CheckIcon} alt="check" />
                )}
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
      <div className="nav">
        <Nav />
      </div>
    </div>
  );
}

export default Shop;
