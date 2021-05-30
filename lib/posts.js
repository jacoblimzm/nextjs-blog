import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

// cwd is current working directory
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts. returns an array of the full filenames
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // returns the FULL ABSOLUTE path by appending the fileName onto the cwd.
    const fullPath = path.join(postsDirectory, fileName);

    // Read markdown file as string.
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    console.log(matterResult.data);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Important: The returned list is not just an array of strings — it MUST be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name).
// Otherwise, getStaticPaths will fail.
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this, with the filetype removed:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // reading the ENTIRE file as a string.
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  // returns metadata in .data property and body in .content property
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string. remark takes time, so need to be asynchronous.
  // this affects ANY function that calls this function. needs to be async as well.
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();


  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
