export type CreateBlogPayload = {
    title: string;
    content: string;
    imageUrl?: string;
  };

  export type UpdateBlogPayload = {
    title?: string;
    content?: string;
    imageUrl?: string;
  };