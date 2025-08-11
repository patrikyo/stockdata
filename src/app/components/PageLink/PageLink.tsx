import pageLinkProps from "@/app/models/interfaces/pageLinkProps.interface";
import Link from "next/link";
import styles from "./PageLink.module.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageLink: React.FC<pageLinkProps> = ({
  href,
  label,
  change,
  backLink,
}) => {
  const getChangeClass = (str: string | undefined) => {
    if (!str) return "";
    if (str.startsWith("+")) {
      return styles.positiveChange;
    } else if (str.startsWith("-")) {
      return styles.negativeChange;
    }
    return "";
  };

  return (
    <Link
      href={href}
      className={`${styles.container} ${
        change ? styles.containerWithChange : styles.containerWithoutChange
      }`}
    >
      {backLink && (
        <FontAwesomeIcon icon={faChevronLeft} id={styles.backIcon} />
      )}
      <span>{label}</span>
      {change && <span className={getChangeClass(change)}>{change}</span>}
    </Link>
  );
};

export default PageLink;
