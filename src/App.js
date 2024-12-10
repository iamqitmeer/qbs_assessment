import React, { Fragment, useState, useEffect } from "react";
import "h8k-components";

import { image1, image2, image3, image4 } from "./assets/images";
import { Thumbs, Viewer } from "./components";

const title = "Catalog Viewer";

function App() {
  const catalogsList = [
    { thumb: image1, image: image1 },
    { thumb: image2, image: image2 },
    { thumb: image3, image: image3 },
    { thumb: image4, image: image4 },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideShowActive, setSlideShowActive] = useState(false);

  const handleArrowForward = () =>
    setActiveIndex((activeIndex + 1) % catalogs.length);
  const handleArrowBack = () =>
    setActiveIndex((activeIndex - 1 + catalogs.length) % catalogs.length);

  const handleThumbClick = (index) => console.log(index);

  useEffect(() => {
    let timer;
    if (slideShowActive) {
      timer = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % catalogs.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [slideShowActive, catalogs.length]);

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                onClick={handleArrowBack}
                className="icon-only outlined"
                data-testid="prev-slide-btn"
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                onClick={(index) => setActiveIndex(index)}
              />

              <button
                onClick={handleArrowForward}
                className="icon-only outlined"
                data-testid="next-slide-btn"
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            checked={slideShowActive}
            onChange={(e) => setSlideShowActive(e.target.checked)}
            data-testid="toggle-slide-show-button"
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
