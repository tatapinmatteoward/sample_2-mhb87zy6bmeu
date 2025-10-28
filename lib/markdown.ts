import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getMarkdownContent(filename: string) {
  const filePath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontmatter: data,
    content,
  };
}

export function getAllBlogPosts() {
  const blogDirectory = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDirectory);
  
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(blogDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        frontmatter: data,
        content,
      };
    });
  
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || 0).getTime();
    const dateB = new Date(b.frontmatter.date || 0).getTime();
    return dateB - dateA;
  });
}
