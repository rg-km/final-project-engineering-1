import { Link } from "react-router-dom";
type Props = {};

type Menu = {
  title: string;
  items: {
    label: string;
    url: string;
  }[];
};

export default function Footer({}: Props) {
  return (
    <div className="">
      <div className="h-[77px] bg-primary flex text-center justify-center items-center">
        <p className="text-white space-x-1">
          <Link to="/" className="text-white">
            U.id
          </Link>
          <span>&copy; {new Date().getFullYear()} | powered by</span>
          <a
            href="https://pandi.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            PANDI
          </a>
        </p>
      </div>
    </div>
  );
}
