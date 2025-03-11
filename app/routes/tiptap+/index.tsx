import { Mention, MentionsInput } from 'react-mentions';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { ArrowLeft, CornerDownRight, MessageSquare, MessageSquarePlus, Reply } from 'lucide-react';
import { initialComments, users, currentUser } from '~/data/mockData';
import { useToast } from '~/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export interface User {
  id: string;
  display: string;
  avatar?: string;
}

export interface CommentData {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
  parentId?: string;
  replies: CommentData[];
}

export default function Index(){
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const { toast } = useToast();

  const addComment = (content: string) => {
    const newComment: CommentData = {
      id: `comment${Date.now()}`,
      user: currentUser,
      content,
      createdAt: new Date(),
      replies: []
    };
    
    setComments([newComment, ...comments]);
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully",
      duration: 3000,
    });
  };

  const addReply = (content: string, parentId: string) => {
    const findAndAddReply = (commentsArray: CommentData[], targetId: string): CommentData[] => {
      return commentsArray.map(comment => {
        if (comment.id === targetId) {
          // Found the parent, add reply to it
          const newReply: CommentData = {
            id: `reply${Date.now()}`,
            user: currentUser,
            content,
            createdAt: new Date(),
            parentId: comment.id,
            replies: []
          };
          return {
            ...comment,
            replies: [newReply, ...comment.replies]
          };
        } else if (comment.replies.length > 0) {
          // Recursively check replies
          return {
            ...comment,
            replies: findAndAddReply(comment.replies, targetId)
          };
        }
        return comment;
      });
    };

    setComments(findAndAddReply(comments, parentId));
    toast({
      title: "Reply posted",
      description: "Your reply has been posted successfully",
      duration: 3000,
    });
  };

  return (
    <div className="container max-w-3xl py-6">
      <div className="flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="ghost" className="flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          Comments
          <MessageSquare className="h-6 w-6 ml-2" />
        </h1>
        <div></div>
      </div>

      <div className="mb-8">
        <CommentInput users={users} onSubmit={addComment} />
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-10">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold">No comments yet</h3>
            <p className="text-gray-500">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onReply={addReply} 
            />
          ))
        )}
      </div>
    </div>
  );
};



interface CommentInputProps {
  users: {
    id: string;
    display: string;
    avatar?: string;
  }[];
  onSubmit: (content: string) => void;
  replyingTo?: {
    id: string;
    display: string;
    avatar?: string;
  };
  placeholder?: string;
  buttonText?: string;
  autoFocus?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ 
  users, 
  onSubmit, 
  replyingTo,
  placeholder = "Write a comment...",
  buttonText = "Post",
  autoFocus = false
}) => {
  const [comment, setComment] = useState(replyingTo ? `@${replyingTo.display} ` : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <Avatar className="h-10 w-10">
        <AvatarImage src={currentUser.avatar} alt={currentUser.display} />
        <AvatarFallback>{currentUser.display.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-3">
          <MentionsInput 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={placeholder}
            className="mentions"
            autoFocus={autoFocus}
          >
            <Mention
              trigger="@"
              data={users}
              renderSuggestion={(suggestion: any, search, highlightedDisplay, index, focused) => (
                <div className={`flex items-center gap-2 p-2 ${focused ? 'bg-gray-100' : ''}`}>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={suggestion.avatar} alt={suggestion.display} />
                    <AvatarFallback>{suggestion.display.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{suggestion.display}</span>
                </div>
              )}
              displayTransform={(id, display) => `@${display}`}
              markup="@[__display__](__id__)"
            />
          </MentionsInput>
          <div className="flex justify-between items-center">
            {replyingTo ? (
              <div className="flex items-center text-sm text-gray-500">
                <CornerDownRight className="h-4 w-4 mr-1" /> Replying to {replyingTo.display}
              </div>
            ) : (
              <div></div>
            )}
            <Button 
              type="submit" 
              className="bg-mention hover:bg-mention-hover"
              disabled={!comment.trim()}
            >
              <MessageSquarePlus className="h-4 w-4 mr-2" />
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


interface CommentProps {
  comment: CommentData;
  onReply: (content: string, parentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = (content: string) => {
    onReply(content, comment.id);
    setIsReplying(false);
  };

  // Function to convert mentions to JSX
  const renderContent = (content: string) => {
    // Regex to find mentions in the format @[display](id)
    const regex = /@\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex, match.index)}</span>);
      }
      parts.push(
        <span key={`mention-${match.index}`} className="bg-mention-light text-mention font-medium px-1 rounded">
          @{match[1]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="mb-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.user.avatar} alt={comment.user.display} />
          <AvatarFallback>{comment.user.display.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{comment.user.display}</h3>
              <span className="text-xs text-gray-500">aa</span>
            </div>
            <div className="text-sm">{renderContent(comment.content)}</div>
            <div className="mt-2 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsReplying(!isReplying)}
                className="text-gray-500 hover:text-mention"
              >
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
            </div>
          </div>
          
          {isReplying && (
            <div className="mt-3 ml-4">
              <CommentInput 
                users={users}
                onSubmit={handleReply}
                replyingTo={comment.user}
                placeholder="Write a reply..."
                buttonText="Reply"
                autoFocus
              />
            </div>
          )}
          
          {comment.replies.length > 0 && (
            <div className="mt-3 ml-4 space-y-3">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
