import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function App() {
  return (
    <>
      <div
        style={{
          width: '100vw',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      ></div>
    </>
  );
}

export default App;

function Posts({ posts, visibleCount, borderWidth }) {
  return (
    <div style={{ width: '85%' }}>
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
  return (
    <div style={{ width: '100%' }}>
      <h2>{hash}</h2>
    </div>
  );
}
