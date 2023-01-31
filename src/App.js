import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function App() {
  const [posts, setPosts] = useState(undefined);
  const [arePostsVisible, setPostVisibility] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [borderWidth, setBorderWidth] = useState(0);

  const postsHash = useMemo(() => {
    const hashSymbol = visibleCount > 50 ? 'aoisdnoea' : 'a6s5d1a68d4';

    if (posts === undefined) {
      return '';
    }

    return JSON.stringify(posts).slice(50, 75) + hashSymbol;
  }, [posts, visibleCount]);

  const fetchPosts = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
      response.json().then((jsonBody) => setPosts(jsonBody))
    );
  }, []);

  useEffect(() => {
    setBorderWidth(visibleCount / 10);
  }, [visibleCount]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <HashDisplay hash={postsHash} />
      <button
        onClick={() =>
          setPostVisibility((currentVisibility) => !currentVisibility)
        }
      >
        {arePostsVisible ? 'Skrýt' : 'Zobrazit'}
      </button>
      <div
        style={{
          width: '100vw',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {arePostsVisible && (
          <Posts
            posts={posts}
            visibleCount={visibleCount}
            borderWidth={borderWidth}
          />
        )}
      </div>
      {arePostsVisible && (
        <button
          disabled={posts === undefined || visibleCount === posts.length}
          onClick={() =>
            setVisibleCount((currentVisibleCount) => currentVisibleCount + 10)
          }
        >
          Zobrazit více
        </button>
      )}
    </>
  );
}

export default App;

function Posts({ posts, visibleCount, borderWidth }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    wrapperRef.current.style.border = `${borderWidth}px solid green`;
  }, [borderWidth]);

  return (
    <div style={{ width: '85%' }} ref={wrapperRef}>
      {posts &&
        posts.slice(0, visibleCount).map((post) => (
          <div
            key={post.id}
            style={{
              width: '100%',
              height: '3rem',
              display: 'flex',
              marginBottom: '1rem',
              backgroundColor: 'lightgreen',
              borderRadius: '15px',
              justifyContent: 'space-between',
              padding: '1rem',
              alignItems: 'center',
            }}
          >
            <b>{post.id}</b>
            <p>{post.title}</p>
          </div>
        ))}
    </div>
  );
}

function HashDisplay({ hash }) {
  useEffect(() => {
    alert('Hash se změnil');
  }, [hash]);

  return (
    <div style={{ width: '100%' }}>
      <h2>{hash}</h2>
    </div>
  );
}
