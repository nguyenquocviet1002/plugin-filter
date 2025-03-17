import React, { useEffect, useState } from "react";
import Item from "../Item";
import listStyled from "./List.module.scss";

const List = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  // logic for displaying a number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Display Data
  const displayData = (data) => {
    return (
      <div className="content">
        {data.length > 0 ?
          data.map((item, index) => {
            return <Item data={item} key={item.stt} index={index} />;
          }) : <div style={{textAlign: 'center'}}>Không có kết quả</div>}
      </div>
    );
  };

  // logic for displaying page numbers
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={`${listStyled['control']} ${currentPage == number ? listStyled['active'] : ''}`}
        >
            {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <>
      {displayData(pageItems)}
      {data.length > itemsPerPage && (
        <ul className={listStyled['pagination']}>
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage == pages[0] ? true : false}
              className={`${listStyled['control']} ${listStyled['back']}`}
            >
              Prev
            </button>
          </li>

          {renderPageNumbers}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage == pages[pages.length - 1] ? true : false}
              className={`${listStyled['control']} ${listStyled['next']}`}
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default List;
