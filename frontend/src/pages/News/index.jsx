import React, { useEffect, memo, useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../../components/loaders/MainLoader";
import { useNavigate } from "react-router-dom";
import ArticleSummary from "./ArticleSummary";
import { Box, TextField } from "@mui/material";
// import dn from "../../components/Test/news.json";

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
  console.log("Newws are", news.slice(0, 6));
  const navigateTo = useNavigate();
  const goToArticle = (index) => {
    navigateTo(`/news/article/${index}`);
  };
  const filtered = searchAndFilterNews(news, searchTerm);
  // useEffect(() => {
  //   const titres = dn.map((item) => item.titres_bvc);
  //   console.log("titres lib", [...new Set(titres)].sort());
  // }, []);
  return (
    <>
      <Filter />
      {loading && <MainLoader />}
      {!loading && news?.length > 0 && (
        <Box>
          <Box className="mb-4 shadow-lg flex justify-between items-center p-4 rounded-md">
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
          {filtered?.map((item, index) => {
            return (
              <>
                <ArticleSummary
                  {...item}
                  onClick={() => goToArticle(index + 1)}
                />
              </>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default memo(index);
