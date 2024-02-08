import React from "react";
import styles from "./style.module.scss";

export default function Skeleton({ width, height, radius, padding, margin }) {
  return (
    <div
      style={{ width, height, padding, margin, borderRadius: radius }}
      className={styles["skeleton"]}
    ></div>
  );
}
