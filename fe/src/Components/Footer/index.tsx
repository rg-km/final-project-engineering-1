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
    <div className="bg-primary-light">
      <div className="h-16 bg-primary flex text-center justify-center items-center">
        <p className="text-white space-x-1">
          <span>Copyright</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <Link to="/" className="text-white">
            {process.env.REACT_APP_APP_NAME}
          </Link>
        </p>
      </div>
    </div>
  );
}
