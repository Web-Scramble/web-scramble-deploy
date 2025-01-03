// Donot touch this file

// it is needed for future reference

// import { useQuery, useQueryClient, useMutation } from "react-query";
// import exampleService from "../services/example-service";

// const useAllPosts = () => {
//   return useQuery(["posts"], exampleService.getAllPosts());
// };

// const usePostById = () => {
//   return useQuery(["posts"], exampleService.getByPostId());
// };

// const useCreatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.addPost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// const useUpdatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.updatePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// const useDeletePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.deletePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// export {
//   useCreatePost,
//   useUpdatePost,
//   usePostById,
//   useAllPosts,
//   useDeletePost,
// };


// Usage here

// import Link from "next/link";
// import { useCreatePost } from "../../src/hooks/example-hook";
// import { useState } from "react";

// export default function Home() {
//   const { mutate: addMutate, isLoading, isError } = useCreatePost();
//   const [postData, setPostData] = useState();

//   const handleSubmit = async () => {
//     addMutate(
//       {},
//       {
//         onSuccess: (response) => {
//           setPostData(response.data.body);
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       <h1>This Component has POST Details</h1>

//       <button>
//         <Link href="/">Back</Link>
//       </button>
//       <div>
//         <h1>Create New Post</h1>

//         <button
//           onClick={() => {
//             handleSubmit();
//           }}
//         >
//           Add Post
//         </button>

//         <h2>Newly Created Data</h2>
//         <div>{postData}</div>
//       </div>
//     </div>
//   );
// }
// import Link from "next/link";
// import { useAllPosts } from "../../src/hooks/example-hook";

// export default function Home() {
//   const { data: postData } = useAllPosts();

//   return (
//     <div>
//       <h1>This Component has GetAll Details</h1>

//       <button>
//         <Link href="/">Back</Link>
//       </button>
//       <div>
//         <h1>Get All the records</h1>
//         <ul>
//           {postData?.data.map((todo) => (
//             <li key={todo.id}>{todo.title}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }