import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import Navbar from "../common/Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Slider } from "@mui/material";
import { Link } from "react-router-dom";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [statusRange, setStatusRange] = useState([0, 100]);

  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
      }}
      spin
    />
  );

  const handleStatusChange = (event, newValue) => {
    setStatusRange(newValue);
  };

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://6476f6b89233e82dd53a99bf.mockapi.io/post"
      );
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, []);
  const filteredProducts = posts.filter(
    (item) =>
      (selectedTypes.length === 0 || selectedTypes.includes(item.type)) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1] &&
      item.status >= statusRange[0] &&
      item.status <= statusRange[1]
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts
    .filter(
      (item) =>
        searchTitle === "" ||
        item.name.toLowerCase().includes(searchTitle.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    const validPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(validPage);
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const totalFilteredProducts = filteredProducts.length;

  const totalPages = Math.ceil(totalFilteredProducts / productsPerPage);

  return (
    <>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.searchBar}>
          <input
            className={styles.search}
            name="search"
            type="text"
            placeholder="Nhập tên sản phẩm"
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className={styles.searchContent}>
          <div className={styles.container}>
            <div className={styles.filterContent}>
              <div className={styles.filterType}>
                <div className={styles.filterTitle}>
                  <i class="fa-solid fa-filter"></i>
                  <span>Bộ lọc tìm kiếm</span>
                </div>
                <h5 style={{ paddingTop: "10px" }}>Lọc theo loại sản phẩm</h5>
                <label>
                  <input
                    type="checkbox"
                    value="stationery"
                    checked={selectedTypes.includes("stationery")}
                    onChange={handleTypeChange}
                  />
                  Đồ dùng học tập
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="tech"
                    checked={selectedTypes.includes("tech")}
                    onChange={handleTypeChange}
                  />
                  Đồ công nghệ
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="book"
                    checked={selectedTypes.includes("book")}
                    onChange={handleTypeChange}
                  />
                  Giáo Trình
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="uniform"
                    checked={selectedTypes.includes("uniform")}
                    onChange={handleTypeChange}
                  />
                  Đồng phục
                </label>
                <div className={styles.filterSlider}>
                  <h5 style={{ paddingTop: "10px" }}>Lọc theo độ mới</h5>
                  <Slider
                    value={statusRange}
                    onChange={handleStatusChange}
                    min={0}
                    max={100}
                    step={10}
                    valueLabelDisplay="auto"
                    aria-labelledby="status-range-slider"
                    style={{ width: "80%", marginLeft: "10px" }}
                  />
                </div>
                <div className={styles.filterSlider}>
                  <h5 style={{ paddingTop: "5px" }}>Lọc theo giá sản phẩm</h5>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    min={0}
                    max={1000}
                    step={10}
                    valueLabelDisplay="auto"
                    aria-labelledby="price-range-slider"
                    style={{ width: "80%", marginLeft: "10px" }}
                  />
                </div>
              </div>
              <div className={styles.searchResult}>
                {loading ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div className={styles.searchBox}>
                    {currentProducts
                      .filter(
                        (item) =>
                          selectedTypes.length === 0 ||
                          selectedTypes.includes(item.type)
                      )
                      .map((item) => (
                        <div key={item.id} className={styles.searchItem}>
                          <div className={styles.searchImage}>
                            <Link to={"detail/" + item.id}>
                              <img src={item.img} alt="" />
                            </Link>
                          </div>
                          <div className={styles.searchText}>
                            <h4>{item.name}</h4>
                            {item.type === "stationery" && (
                              <h6>{item.price} VNĐ</h6>
                            )}
                            {item.type === "book" && <h6>{item.price} VNĐ</h6>}
                            {item.type === "tech" && <h6>{item.price} VNĐ</h6>}
                            {item.type === "uniform" && (
                              <h6>{item.price} VNĐ</h6>
                            )}
                            <div className={styles.searchFooter}>
                              <span>Độ mới: {item.status}%</span>
                              <p>{item.address}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                <Pagination
                  current={currentPage}
                  pageSize={productsPerPage}
                  total={posts.length}
                  onChange={handlePageChange}
                  style={{ display: "flex", justifyContent: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
