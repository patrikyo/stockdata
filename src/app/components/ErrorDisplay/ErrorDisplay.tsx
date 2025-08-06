import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from "./ErrorDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorDisplayProps from "@/app/models/interfaces/errorDisplayProps.interface";

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ msg }) => {
  return (
    <div className={styles.errorContainer}>
      <FontAwesomeIcon icon={faExclamationTriangle} id={styles.triangleIcon} />
      <p className={styles.errorMsg}>{msg}</p>
    </div>
  );
};

export default ErrorDisplay;
