export function FeedSkelton() {
  return (
    <div className="flex flex-wrap">
      <PostCardSkelton />
      <PostCardSkelton />
      <PostCardSkelton />
      <PostCardSkelton />
      <PostCardSkelton />
      <PostCardSkelton />
      <PostCardSkelton />
      <PostCardSkelton />
    </div>
  );
}

export function PostCardSkelton() {
  return (
    <div className="basis-[calc(50%-1rem)] m-2 p-4 border rounded">
      <div className="animate-pulse">
        {/* トピックタグの部分 */}
        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
        {/* タイトルの部分（2行分くらい） */}
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
        {/* 日付と作成者の部分 */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
