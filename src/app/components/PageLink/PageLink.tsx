import pageLinkProps from "@/app/models/interfaces/pageLinkProps.interface";
import Link from "next/link";
import styles from "./PageLink.module.css";

const PageLink: React.FC<pageLinkProps> = ({ href, label, change }) => {
  return (
    <Link
      href={href}
      className={`${styles.container} ${
        change ? styles.containerWithChange : styles.containerWithoutChange
      }`}
    >
      <span>{label}</span>
      {change && <span className={styles.change}>{change}</span>}
    </Link>
  );
};

export default PageLink;
