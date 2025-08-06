import pageLinkProps from "@/app/models/interfaces/pageLinkProps.interface";
import Link from "next/link";
import styles from "./PageLink.module.css";

const PageLink: React.FC<pageLinkProps> = ({ href, label }) => {
  return (
    <div className={styles.container}>
      <Link href={href}>{label}</Link>
    </div>
  );
};

export default PageLink;
