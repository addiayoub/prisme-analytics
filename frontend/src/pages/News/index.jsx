import React, { memo, useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../../components/loaders/MainLoader";
import { useNavigate } from "react-router-dom";
import ArticleSummary from "./ArticleSummary";
import { Box, TextField } from "@mui/material";
import MainArticle from "./MainArticle";
import NewsSwiper from "./NewsSwiper";

function searchAndFilterNews(data, searchTerm) {
  searchTerm = searchTerm.toLowerCase().trim();
  if (searchTerm === "") {
    return data;
  }
  return data.filter((news) => {
    return (
      news.Titre.toLowerCase().includes(searchTerm) ||
      news.descrip.toLowerCase().includes(searchTerm)
    );
  });
}

const index = () => {
  const {
    loading,
    data: { news },
  } = useSelector((state) => state.profilFin);
  const [searchTerm, setSearchTerm] = useState("");
  const navigateTo = useNavigate();
  const goToArticle = (index) => {
    navigateTo(`/news/article/${index}`);
  };
  const filtered = searchAndFilterNews(news, searchTerm);
  return (
    <>
      <Filter />

      {loading && <MainLoader />}
      {!loading && news?.length > 0 && (
        <Box>
          <Box className="mb-12 shadow-lg flex justify-between items-center p-4 rounded-md">
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              label="Rechercher"
            />
            <div className="font-semibold">
              <span>{filtered.length}</span>/<span>{news.length}</span>
            </div>
          </Box>
       
          <NewsSwiper news={filtered} goToArticle={goToArticle} />
        </Box>
      )}
    </>
  );
};

export default memo(index);
