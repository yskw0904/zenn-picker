import { Suspense } from "react";
import Parser from "rss-parser";
import { FeedSkelton } from "@/app/ui/skeltons";

type Post = {
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
  creator: string;
  topic: string;
};

export const revalidate = 3600; // 3600秒 = 1時間ごとに更新

async function getZennPosts(topic: string): Promise<Post[]> {
  const parser = new Parser();
  const feed = await parser.parseURL(
    `https://zenn.dev/topics/${topic.toLowerCase()}/feed`,
  );

  // mapの戻り値を明示的にPost型に合わせる
  return feed.items.map((item) => ({
    title: item.title ?? "無題",
    link: item.link ?? "",
    pubDate: item.pubDate ?? "",
    isoDate: item.isoDate ?? "",
    creator: item.creator ?? "",
    topic: topic,
  }));
}

export default function Home() {
  const topics = ["PHP", "Nextjs"];

  return (
    <main className="m-5">
      <h1 className="text-2xl font-bold m-2">自分専用技術フィード</h1>
      <Suspense fallback={<FeedSkelton />}>
        <Feed topics={topics} />
      </Suspense>
    </main>
  );
}

const tagColors: Record<string, string> = {
  PHP: "bg-blue-100 text-blue-700",
  Nextjs: "bg-black text-white",
};

async function Feed({ topics }: { topics: string[] }) {
  const feeds = await Promise.all(topics.map((topic) => getZennPosts(topic)));
  const allPosts = feeds
    .flat()
    .sort(
      (a, b) => new Date(b.isoDate!).getTime() - new Date(a.isoDate!).getTime(),
    );
  return (
    <div className="flex flex-wrap">
      {allPosts.map((post) => (
        <a
          key={post.link}
          href={post.link}
          target="_blank"
          className="basis-[calc(50%-1rem)] m-2 p-4 border rounded hover:bg-gray-50 transition"
        >
          <span
            className={`px-2 py-0.5 rounded ${tagColors[post.topic] || "bg-gray-100"}`}
          >
            {post.topic}
          </span>
          <h2 className="font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(post.pubDate!).toLocaleDateString()} {post.creator}
          </p>
        </a>
      ))}
    </div>
  );
}
