import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "./context";
import { useState } from "react";
import { RiDownloadFill } from "react-icons/ri";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const [pageNumber, setPageNumber] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 2);
  };

  const handlePrev = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 2, 1));
  };
  const apiKey = import.meta.env.VITE_API_KEY;
  // console.log(apiKey);

  const response = useQuery({
    queryKey: ["images", searchTerm, pageNumber],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${apiKey}&per_page=21&page=${pageNumber}&query=${searchTerm}`
      );
      return res.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <div className="loading"></div>
      </section>
    );
  }
  if (response.isError) {
    toast.error("There is an Error!");
    return null;
  }
  const results = response.data.results;

  if (results.length < 1) {
    toast.dismiss();
    toast.error("No Results Found...");
    document.body.classList.add("background-404");
    return null;
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleDownload = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };
  document.body.classList.remove("background-404");
  const disablePrev = pageNumber === 1;
  return (
    <>
      <section className="image-container">
        {results.map((item) => {
          const regularUrl = item.urls.regular;
          const imageUrl = item.links.download;
          return (
            <div
              className="img-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              key={item.id}
            >
              <img
                src={regularUrl}
                alt={item.alt_description}
                className="img"
              />
              {isHovered && (
                <div className="overlay">
                  <button
                    className="button"
                    onClick={() => handleDownload(imageUrl)}
                  >
                    <RiDownloadFill />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="container">
        <button
          type="button"
          className={disablePrev ? "disablebtn" : "btn"}
          onClick={handlePrev}
        >
          Prev
        </button>
        <button type="button" className="btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};
export default Gallery;
