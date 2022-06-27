import moment from "moment";
import { Link } from "react-router-dom";
import { Question } from "../../store/store";
import { ChatIcon, LikeIcon } from "../Icons";

type Props = {
  data: Question;
};

export default function CardQuestion({ data }: Props) {
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
            <p>{data.content}</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-wrap">
                {data.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="space-x-2 text-xs">
                <span className="text-primary">{data.author}</span>
                <span className="text-gray-400">
                  {moment(data.created_at).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
