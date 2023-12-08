export default function GetStoryImagePath(storyName: string) {
  const imageName = storyName
    .replace(/\s/g, "_")
    .replace(/'/g, "")
    .toLowerCase();
  return `/images/stories/${imageName}.png`;
}
