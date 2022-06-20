import { Link } from "react-router-dom";
import { ChatIcon, LikeIcon } from "../Icons";

type Props = {
  id: string;
};

export default function CardQuestion({id}: Props) {
  return (
    <Link to={`/question/${id}`}>
      <div className="border shadow rounded-md p-4">
        <div className="flex flex-row space-x-4">
          {/* Stats */}
          <div className="w-1/12">
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p>1</p>
              <p className="h-6 w-6">{LikeIcon}</p>
            </div>
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p>1</p>
              <p className="h-6 w-6">{ChatIcon}</p>
            </div>
          </div>
          <div className="w-11/12 space-y-4">
            <h1 className="font-bold text-lg">Ini judul halaman</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
              similique sit esse numquam, fuga natus impedit repudiandae tempore
              laudantium asperiores quas? Porro ipsam facere, recusandae beatae
              excepturi rerum tempora corporis.
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-wrap">
                <div className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs">
                  ReactJS
                </div>
                <div className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs">
                  Javascript
                </div>
                <div className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs">
                  Typescript
                </div>
              </div>
              <div className="space-x-2 text-xs">
                <span className="text-primary">Author</span>
                <span className="text-gray-400">1 menit yang lalu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
