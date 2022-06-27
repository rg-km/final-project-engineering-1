import create from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  id: number;
  token: string;
  username: string;
}

export interface Answer {
  id: number;
  content: string;
  author: string;
  created_at: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  created_at: string;
  answer: Answer[];
}

interface StoreState {
  isLoading: Boolean;
  setIsLoading: (isLoading: Boolean) => void;
  isLogin: Boolean;
  setIsLogin: (login: Boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  questions: Question[];
  setQuestions: (questions: Question[] | undefined) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isLoading: true,
      setIsLoading: (loading: Boolean) => set(() => ({ isLoading: loading })),
      isLogin: false,
      setIsLogin: (login: Boolean) => set(() => ({ isLogin: login })),
      user: undefined,
      setUser: (user: User | undefined) => set(() => ({ user: user })),
      questions: [
        {
          id: 1,
          title: "Startswith function for searching an array",
          content:
            '5I have a function that is giving me some trouble. The code below returns the error message "Cannot read property \'value\' of undefined". The function should just search through the values in the accountlist and return the one that starts with the submitted string. In the example, submitting "000555" should return 0.',
          author: "funcoding",
          created_at: "2020-01-01",
          tags: ["Javascript"],
          answer: [
            {
              id: 1,
              content:
                "You should use filter & startsWith method. The filter() method creates a new array with all elements that pass the test implemented by the provided function.",
              author: "Ganesh Gajre",
              created_at: "2020-01-02",
            },
          ],
        },
        {
          id: 2,
          title: "Calling contract without knowing contract parameter type",
          content: `If I wanted my contract to be able to call different types of contracts, with different parameters and parameter types, and I didn't know what those parameters were going to be ahead of time... I have a method that needs to be able to call an oracle. When adding the oracle, the user will add the parameters needed to call the oracle. I'm not sure how to store the parameter types, but I figure I could store the parameter type as a string...Anyways, is this possible?`,
          author: "littlezigy",
          created_at: "2022-01-01",
          tags: ["Ligo"],
          answer: [
            {
              id: 2,
              content:
                "4I believe this is not possible, one solution would be to use a parameter of type bytes that would be the result of a pack, then your unknown future contracts will know how to unpack this param",
              author: "Ganesh Gajre",
              created_at: "2022-02-02",
            },
          ],
        },
      ],
      setQuestions: (questions: Question[] | undefined) =>
        set(() => ({ questions: questions })),
    }),
    { name: "auth-store" }
  )
);
export default useStore;
