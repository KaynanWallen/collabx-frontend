import { CommentData, User } from "~/routes/tiptap+";

export const users: User[] = [
  { id: "user1", display: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "user2", display: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "user3", display: "Robert Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "user4", display: "Anna Williams", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: "user5", display: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "user6", display: "Emily Davis", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: "user7", display: "David Miller", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: "user8", display: "Olivia Wilson", avatar: "https://i.pravatar.cc/150?img=8" },
];

// Current user is always the first one for simplicity
export const currentUser = users[0];

export const initialComments: CommentData[] = [
  {
    id: "comment1",
    user: users[1],
    content: "This is a great discussion. I'd love to hear what @John Doe thinks about this topic.",
    createdAt: new Date("2023-09-15T10:22:33"),
    replies: [
      {
        id: "comment3",
        user: users[0],
        content: "Thanks for tagging me @Jane Smith. I think this is a fascinating subject!",
        createdAt: new Date("2023-09-15T11:15:22"),
        parentId: "comment1",
        replies: []
      }
    ]
  },
  {
    id: "comment2",
    user: users[2],
    content: "Has anyone tried the new feature that @Michael Brown was working on?",
    createdAt: new Date("2023-09-14T15:30:45"),
    replies: [
      {
        id: "comment4",
        user: users[4],
        content: "Hey @Robert Johnson, yes! The feature is now in beta testing. You should try it out!",
        createdAt: new Date("2023-09-14T16:42:10"),
        parentId: "comment2",
        replies: []
      }
    ]
  }
];