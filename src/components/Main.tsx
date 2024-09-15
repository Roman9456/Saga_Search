import { useAppDispatch, useAppSelector } from "../models/hook";
import { getPosts } from "../redux/DataSlice";

export default function Main() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.data.posts);
  const isError = useAppSelector((state) => state.data.error);
  const loading = useAppSelector((state) => state.data.loading);

  return (
    <div>
      <input
        type="text"
        onChange={(evt) => {
          const target = evt.target as HTMLInputElement;
          dispatch(getPosts(target.value));
        }}
      />
      {loading && <div className="loading">Updating...</div>}
      <ul>
        {isError && <div>{isError}</div>}
        {posts.length === 0 && !isError && (
          <div>Type something to search...</div>
        )}
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
}
