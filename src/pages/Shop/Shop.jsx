import { useState, useEffect } from "react";
import axios from "axios";
import "./Shop.css";
import ShopExplain from "../../assets/Shop.svg";
import CloseIcon from "../../assets/close.svg";
import CheckIcon from "../../assets/check.svg";
import ItemExplain from "./ItemExplain";

function Shop() {
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("인기순");
  const [products, setProducts] = useState([]); // 서버에서 가져온 데이터를 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [page, setPage] = useState(1); // 현재 페이지 번호

  // API 호출 함수
  const fetchProducts = async (keyWordId) => {
    setIsLoading(true);
    setError(null);
    console.log("hi");
    try {
      const response = await axios.get(
        "http://15.164.231.201:8080/store/show_products_by_keyword",
        {
          params: {
            keyWordId: 0,
          },
        }
      );
      // const response = await axios.get("/store/show_products_by_keyword", {
      //   params: {
      //     keyWordId: 0,
      //   },
      // });
      if (response.data && response.data.productData) {
        console.log("데이터 확인:", response.data.productData); // 받아온 데이터 출력
        setProducts(response.data.productData); // 서버에서 받은 데이터 저장
      } else {
        console.log("데이터 없음");
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("상품 데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 초기 데이터 로드 (예: "금연" 키워드로 검색)
    fetchProducts();
  }, []); // 페이지가 변경될 때마다 API 호출

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
            <div key={index} className="product-card">
              <img
                src={
                  product.productImageUrl || "https://via.placeholder.com/150"
                }
                alt={product.productName}
                className="product-image"
              />
              <p className="product-description">{product.productName}</p>
              <p className="product-price">{product.productPrice}</p>
              <div className="product-rating">랭킹: {product.rank}</div>
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
