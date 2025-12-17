import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import "./reels.css";

const fetchReels = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `http://localhost:3004/reels?_page=${pageParam}&_limit=5`
  );
  return res.data;
};

const Reel = () => {
  const videoRefs = useRef([]);
  const observerRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["reels"],
    queryFn: fetchReels,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 5 ? allPages.length + 1 : undefined,
  });

  // 🎥 Auto-play visible reel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
    );

    videoRefs.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, [data]);

  // 🔁 Infinite scroll loader
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <p>Loading reels...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="reels-container">
      {data?.pages.map((page, pageIndex) =>
        page.map((reel, i) => (
          <div key={reel.id} className="reel">
            <video
              ref={(el) => (videoRefs.current[pageIndex * 5 + i] = el)}
              className="reel-video"
              src={reel.videoUrl}
              loop
              muted
              playsInline
            />
            <div className="reel-overlay">
              <div className="reel-left">
                <div className="user-info">
                  <img
                    src={reel.profilePic}
                    alt={reel.username}
                    className="profile-pic"
                  />
                  <p className="username">@{reel.username}</p>
                </div>
                <p className="caption">{reel.caption}</p>
              </div>

              <div className="reel-actions">
                <div className="action">❤️ {reel.likes}</div>
                <div className="action">💬 {reel.comments?.length || 0}</div>
                <div className="action">↗️</div>
              </div>
            </div>
          </div>
        ))
      )}

      <div ref={observerRef} className="loader">
        {isFetchingNextPage ? "Loading more reels..." : ""}
      </div>
    </div>
  );
};

export default Reel;
