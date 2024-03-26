import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArticleImage from "./ArticleImage";

const ArticleDetails = () => {
  const {
    data: { news },
  } = useSelector((state) => state.profileFin);
  const { id } = useParams();
  const article = news[id - 1];
  const navigateTo = useNavigate();
  console.log("index is", id, news[id], news);
  useEffect(() => {
    if (!article) {
      console.log("article not found");
      navigateTo("/news");
    }
  }, [article]);
  if (!article) {
    return <h1>No article</h1>;
  }
  return (
    <div className="relative flex flex-col">
      <div className="mx-0 mt-1">
        <h1
          id="articleTitle"
          className="mb-2 font-bold text-xl md:mb-4 md:leading-[60px] md:text-[25px] "
        >
          {article.Titre}
        </h1>
        <div className="mt-2 flex flex-col gap-2 text-xs md:mt-2.5 md:gap-2.5">
          <div className="flex flex-col gap-2 text-warren-gray-700 md:flex-row md:items-center md:gap-0">
            <div className="flex flex-row items-center">
              <span>
                Publié le {moment(article.Date).format("DD/MM/YYYY HH:MM")}
              </span>
              <div className="flex flex-row items-center md:hidden"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 mt-8 relative h-[294px] w-full overflow-hidden sm:h-[420px] xl:h-[441px]">
        {/* <img
          className="h-full w-full object-cover"
          src="https://i-invdn-com.investing.com/news/arrows_up_b_5._800x533_L_1413796990.jpg"
          alt=""
        /> */}
        <ArticleImage name={article.titres_bvc} className="object-fit" />
        <div className="absolute bottom-0 w-full bg-gray-500/50 px-3.5 py-3">
          <p className="text-xs text-gray-200"></p>
        </div>
      </div>
      <div className="mb-5 mt-3.5  md:mb-8 md:mt-6">
        <div className="h-px bg-[#E6E9EB]"></div>
      </div>
      <div className="">
        <div className="text-[17px] leading-8">{article.article}</div>
      </div>
    </div>
  );
};

export default ArticleDetails;
