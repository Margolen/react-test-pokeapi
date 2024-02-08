import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./style.module.scss";

export default function CardSkeleton() {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__img"]}>
        <Skeleton width={"208px"} height={"208px"} />
      </div>
      <div className={styles["card__content"]}>
        <Skeleton width={"10em"} height={"2em"} />
        <Skeleton width={"9em"} height={"1.5em"} />
      </div>
    </div>
  );
}
