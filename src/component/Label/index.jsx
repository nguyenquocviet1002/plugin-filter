import React from "react";
import labelStyled from "./Label.module.scss";

const Label = ({ label, value, color, index }) => {
  const valueDom = (int) => {
    if (typeof int === "object") {
      return (
        <div>
          {int.map((item, index) => (
            <div key={`${index}-label-value`} className={labelStyled["obj"]}>
              Lần {index > 1 ? <span>&#62;&#61;{index + 1}</span>  : index + 1}:{" "}
              <span className={labelStyled["text"]}>{item}</span>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        int && <div
          className={`${labelStyled["value"]} ${
            color ? labelStyled["security"] : ""
          } ${color ? labelStyled[color] : ""} ${
            label === "Xử lý" ? labelStyled["hidden"] : ""
          }`}
        >
          {label === "Xử lý" ? <strong>*Lưu ý:</strong> : ""} {index && <b>{index}.</b>} {int}
        </div>
      );
    }
  };
  return (
    <div className={labelStyled["label__wrapper"]}>
      {/* {label && <div className={labelStyled['label']}>{label}: </div>} */}
      {valueDom(value)}
    </div>
  );
};

export default Label;
