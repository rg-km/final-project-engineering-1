import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../../Components/Comments/Comments";
import { ChatIcon, LikeIcon } from "../../Components/Icons";
import useStore, { Question } from "../../store/store";

type Props = {};

export default function Detail({}: Props) {
  const { setIsLoading, questions } = useStore();
  const [data, setData] = useState<Question>();
  let { id } = useParams();

  useEffect(() => {
    setIsLoading(false);
    setData(questions.find((item) => item.id === Number(id)));
    return () => setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="space-y-4 divide-y">
      {/* Question */}
      <div className="space-y-2">
        {/* User Info */}
        <div className="flex flex-row items-center space-x-2">
          <img
            src="https://dummyimage.com/200.png"
            alt=""
            className="w-12 h-12 aspect-square rounded-full"
          />
          <div>
            <p className="font-bold">{data?.author}</p>
            <p className="text-sm">{data?.created_at}</p>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-lg font-bold">{data?.title}</h1>
        {/* Content Body */}
        <p>{data?.content}</p>
        {/* Tags */}
        <div className="flex flex-wrap">
          {data &&
            data.tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs"
              >
                {tag}
              </div>
            ))}
        </div>
        {/* Like Dislike */}
        {/* <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-row space-x-2 items-center justify-end text-lg">
            <p className="h-6 w-6">{LikeIcon}</p>
            <p className="text-sm">1</p>
          </div>
          <div className="flex flex-row space-x-2 items-center justify-end text-lg">
            <p className="h-6 w-6  rotate-180">{LikeIcon}</p>
            <p className="text-sm">1</p>
          </div>
          <div className="flex flex-row space-x-2 items-center justify-end text-lg">
            <p className="h-6 w-6">{ChatIcon}</p>
            <p className="text-sm">1</p>
          </div>
        </div> */}
      </div>
      {/* Comment Section */}
      <div className="pt-4">
        <Comments data={data?.answer} />
      </div>
    </div>
  );
}
