import pageLinkProps from "@/app/models/interfaces/pageLinkProps.interface";
import Link from "next/link";

const PageLink: React.FC<pageLinkProps> = ({ href, label }) => {
  return (
    <div>
      <Link href={href}>{label}</Link>
    </div>
  );
};

export default PageLink;
