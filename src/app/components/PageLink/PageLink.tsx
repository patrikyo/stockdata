import pageLinkProps from "@/app/models/interfaces/pageLinkProps.interface";
import Link from "next/link";
import styles from "./PageLink.module.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getChangeClass } from "@/app/utils/classNameUtil";
import { formatSignedNumber } from "@/app/utils/format";

const PageLink: React.FC<pageLinkProps> = ({
  href,
  label,
  change,
  backLink,
}) => {
  return (
    <Link
      href={href}
      className={`${styles.container} ${
        change !== undefined
          ? styles.containerWithChange
          : styles.containerWithoutChange
      }`}
    >
      {backLink && (
        <FontAwesomeIcon icon={faChevronLeft} id={styles.backIcon} />
      )}
      <span>{label}</span>
      {change && (
        <span className={getChangeClass(change)}>
          {formatSignedNumber(change)}
        </span>
      )}
    </Link>
  );
};

export default PageLink;
