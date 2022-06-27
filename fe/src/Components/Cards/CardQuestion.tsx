import moment from "moment";
import { Link } from "react-router-dom";
import { Question } from "../../Model";
import useStore from "../../store/store";
import { ChatIcon, LikeIcon } from "../Icons";

type Props = {
  data: Question;
};

export default function CardQuestion({ data }: Props) {
  const { categories } = useStore();
  const labelCategory = (id_category?: number) => {
    if (id_category) {
      const category = categories.find((item) => item.id === id_category);
      if (category) {
        return (
          <div className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs">
            {category.name}
          </div>
        );
      }
    }
  };
  return (
    <Link to={`/question/${data.id}`} className="block">
      <div className="border shadow rounded-md p-4">
        <div className="flex flex-row space-x-4">
          {/* Stats */}
          {/* <div className="w-1/12">
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p>1</p>
              <p className="h-6 w-6">{LikeIcon}</p>
            </div>
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p>1</p>
              <p className="h-6 w-6">{ChatIcon}</p>
            </div>
          </div> */}
          <div className="w-11/12 space-y-4">
            <h1 className="font-bold text-lg">{data.title}</h1>
            <p>{data.deksripsi}</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-wrap">
                {labelCategory(data?.id_category)}
              </div>
              <div className="space-x-2 text-xs">
                <span className="text-primary">{data?.id_user}</span>
                <span className="text-gray-400">
                  {moment(data.last_modified).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
