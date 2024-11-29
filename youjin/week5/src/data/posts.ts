// ------------------------ src/data/posts.ts ------------------------ //

export interface Post {
    id: number;
    title: string;
    content: string;
  }
  
  export const posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the content of the second post.',
    },
  ];
  