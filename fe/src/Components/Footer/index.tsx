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
    <div className="bg-orange-500">
      <div className="h-16 bg-primary flex text-center justify-center items-center">
        <p className="text-white space-x-1">
          <Link to="/" className="text-white">
            U.id
          </Link>
          <span>&copy; {new Date().getFullYear()} | powered by</span>
          <Link to="/">{process.env.REACT_APP_APP_NAME}</Link>
        </p>
      </div>
    </div>
  );
}
