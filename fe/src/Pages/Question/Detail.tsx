import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios } from "../../api";
import Comments from "../../Components/Comments/Comments";
import { ChatIcon, LikeIcon } from "../../Components/Icons";
import { Answer, Question } from "../../Model";
import useStore from "../../store/store";

type Props = {};

export default function Detail({}: Props) {
  const { setIsLoading, questions, categories } = useStore();
  const [data, setData] = useState<Question>();
  const [answer, setAnswer] = useState<Answer[]>([]);
  let { id } = useParams();

  const getData = () => {
    setData(questions.find((item) => item.id === Number(id)));
    setIsLoading(true);
    Axios.get(`/responscontent/${id}`)
      .then((res) => {
        setAnswer(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast.error("Failed to get comments");
      })
      .finally(() => setIsLoading(false));
  };

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

  useEffect(() => {
    setIsLoading(false);
    if (id) {
      getData();
    }
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
            <p className="font-bold">{data?.username}</p>
            <p className="text-sm">
              {data?.last_modified ? moment(data.last_modified).fromNow() : "-"}
            </p>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-lg font-bold">{data?.title}</h1>
        {/* Content Body */}
        <p>{data?.deksripsi}</p>
        {/* Tags */}
        <div className="flex flex-wrap">{labelCategory(data?.id_category)}</div>
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
        <Comments id={id} data={answer} getData={getData} />
      </div>
    </div>
  );
}
