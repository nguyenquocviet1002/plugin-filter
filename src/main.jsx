import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { getList } from "./api/https";
import { removeDuplicate, removeAccented } from "./utils/setup";
import Input from "./component/Input";
import Checkbox from "./component/Checkbox";
import List from "./component/List";
import Button from "./component/Button";
import IMAGES from "./Images/Images";
import "./style.css";

const App = () => {
  const initial = {
    key: "",
    nhom_loi: "",
    muc_do: "",
  };
  const mucdo = ["Nhẹ", "Trung bình", "Nặng", "Nghiêm trọng"];

  const [dataOriginal, setDataOriginal] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(initial);
  const [nhomLoi, setNhomLoi] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [listKey, setListKey] = useState([]);
  const [listKey2, setListKey2] = useState([]);
  const [show, setShow] = useState(false);

  const [direction, setDirection] = useState(false);
  const ref = useRef(null);

  const myRef = useRef(null)

   const executeScroll = () => myRef.current.scrollIntoView({ behavior: "smooth" })    

  const controlDirection = () => {
    const offsetTop = ref.current.getBoundingClientRect().top;
    if (offsetTop <= 0) {
      setDirection(true);
    } else {
      setDirection(false);
    }
  };

  useEffect(() => {
    getList()
      .then((response) => {
        const dataRemoveNull = response.filter((item) => {
          return item.bo_luat !== null;
        });
        setDataOriginal(dataRemoveNull);
        setData(dataRemoveNull);

        const allNhomLoi = response.map((item) => {
          return item.nhom_loi;
        });
        setNhomLoi(removeDuplicate(allNhomLoi.filter((x) => x !== null)));

        const allKey = [];
        response.forEach((item) => {
          allKey.push(...item.tim_kiem);
        });
        const newAllKey = removeDuplicate(allKey);
        setListKey(newAllKey);
        setListKey2(newAllKey);
      })
      .catch((err) => console.log(err));

    window.addEventListener("scroll", controlDirection);
    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, []);

  useEffect(() => {
    if (dataOriginal) {
      let dataNew = [];
      dataNew = dataOriginal.filter((item) => {
        return removeAccented(item.nhom_loi).includes(
          removeAccented(filter.nhom_loi)
        );
      });
      dataNew = dataNew.filter((item) => {
        return removeAccented(item.muc_do).includes(
          removeAccented(filter.muc_do)
        );
      });
      dataNew = dataNew.filter((item) => {
        const itemNonAccented = item.tim_kiem.map((keyWord) =>
          removeAccented(keyWord)
        );
        if (filter.key) {
          return itemNonAccented.includes(removeAccented(filter.key));
        } else {
          return dataNew;
        }
      });
      setData(dataNew);
    }
  }, [filter.nhom_loi, filter.muc_do, isSearch]);

  const handleKey = (e) => {
    setFilter((prev) => ({ ...prev, key: e.target.value }));
    const newListKey = listKey.filter((item) => {
      if (removeAccented(item).includes(removeAccented(e.target.value))) {
        return item;
      }
    });
    setListKey2(newListKey);
  };

  const handleDropdown = (value) => {
    setFilter((prev) => ({ ...prev, key: value }));
    const newListKey = listKey.filter((item) => {
      if (removeAccented(item).includes(removeAccented(value))) {
        return item;
      }
    });
    setListKey2(newListKey);
  };

  const handleSelect1 = (e) => {
    setFilter((prev) => ({ ...prev, nhom_loi: e.target.value }));
    setShow(true);
    executeScroll();
  };

  const handleSelect3 = (e) => {
    setFilter((prev) => ({ ...prev, muc_do: e.target.value }));
    setShow(true);
    executeScroll();
  };

  const handleSearch = () => {
    setIsSearch(!isSearch);
    setShow(true);
    executeScroll();
  };

  const refillData = (value) => {
    const reData = data.filter((item) => {
      return item.nhom_loi === value;
    });
    return reData;
  };

  return (
    <div id="page3" className="filter_ksnb_1_0_0" ref={myRef}>
      <div
        className={`${"filter_ksnb_1_0_0__top"}`}
        ref={ref}
      >
        <div className="container">
          {
            <div className="filter_ksnb_1_0_0__inner">
              <Checkbox
                placeholder="Nhóm lỗi"
                option={nhomLoi}
                event={handleSelect1}
                value={filter.nhom_loi}
              />
              <Checkbox
                placeholder="Mức độ xử lý"
                option={mucdo}
                event={handleSelect3}
                value={filter.muc_do}
              />
              <div className="filter_ksnb_1_0_0__search">
                <Input
                  placeholder="Nhập từ khóa tìm kiếm"
                  event={handleKey}
                  value={filter.key}
                  dropdown={listKey2}
                  handleDropdown={handleDropdown}
                  eventDrop={handleSearch}
                />
                <Button
                  icon={IMAGES.iconSearch}
                  background="primary"
                  style={{ marginLeft: "10px" }}
                  event={filter.key ? handleSearch : null}
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          }
          <div className="filter_ksnb_1_0_0__label">
            {(filter.muc_do || filter.nhom_loi || filter.key) && (
              <Button
                background="second"
                size="small"
                event={() => {
                  setFilter(initial);
                  setData(dataOriginal);
                  setListKey2(listKey);
                  setShow(false);
                }}
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="container-full2">
        <div className="filter_ksnb_1_0_0__main">
          {data.length > 0 ? nhomLoi.map((item, index) => {
            return (
              <List
                data={refillData(item)}
                cate={item}
                key={item}
                index={index}
                show={show}
              />
            );
          })
        : <div className="filter_ksnb_1_0_0__empty">Không có kết quả tìm kiếm</div>
        }
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
