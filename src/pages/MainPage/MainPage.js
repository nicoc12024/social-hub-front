import { useState, useEffect, useContext } from "react";
import Header from "../../components/layout/Header";
import { BlogForm } from "./BlogForm";
import { Blogs } from "./Blogs";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "./hooks/useBlogs";
import { AuthContext } from "../../context/AuthProvider";

function MainPage() {
  const { blogs, setBlogs, loadMore, showLoadMoreButton } = useBlogs();

  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [edit, setEdit] = useState(false);
  const [itemId, setItemId] = useState("");

  const { loading, userId } = useContext(AuthContext);

  // redirect to login if not logged in
  useEffect(() => {
    if (!loading && !userId) {
      navigate("/");
    }
  }, [userId, navigate, loading]);

  if (userId === null) {
    return <div className="min-h-screen bg-bgDarkPurple"></div>;
  }

  return (
    <>
      {/* Main */}
      <div className="min-h-screen w-full  mx-auto bg-bgDarkPurple ">
        <Header />
        <h1 className="font-bold text-center text-4xl p-4 gradient-text font-montserrat">
          Welcome to Social Hub!
        </h1>
        {/* Body */}
        <div className="container max-w-[700px] px-4 pt-4 pb-24 mx-auto">
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            body={body}
            setBody={setBody}
            setEdit={setEdit}
            edit={edit}
            itemId={itemId}
          />
          <Blogs
            blogs={blogs}
            setBlogs={setBlogs}
            setBody={setBody}
            setEdit={setEdit}
            edit={edit}
            setItemId={setItemId}
            userId={userId}
          />
          {showLoadMoreButton && (
            <div className="text-center">
              <button
                onClick={loadMore}
                className="butn butn__new mt-4 mx-auto !py-[8px] !px-[12px] !mr-0 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#3478F6] border border-transparent rounded-sm active:bg-gray-900 false"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default MainPage;
