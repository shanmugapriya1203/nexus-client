import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Modal,
  Label,
  TextInput,
  Button,
  Timeline,
} from "flowbite-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import moment from "moment";
import { BASE_URL } from "../../api/apiservice";

const ThreadCard = ({ thread, fetchThreads }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [likeCount, setLikeCount] = useState(thread.likes.length);
  const [liked, setLiked] = useState(
    thread.likes.some((like) => like._id === currentUser.user.id)
  );
  console.log(liked);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setLiked(thread.likes.includes(currentUser.user.id));
    setLikeCount(thread.likes.length);
  }, [thread.likes, currentUser.user.id]);

  const fetchReplies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/threads/${thread._id}/replies`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setReplies(data);
      } else {
        throw new Error("Failed to fetch replies");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (!showReplies) {
      fetchReplies();
    }
  };

  const toggleLike = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/threads/${thread._id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const updatedThread = await response.json();
        const isLiked = updatedThread.likes.some(
          (like) => like._id === currentUser.user.id
        );
        setLiked(isLiked);
        setLikeCount(updatedThread.likes.length);
      } else {
        throw new Error("Failed to toggle like");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/threads/${thread._id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: replyContent,
            authorId: currentUser.user.id,
          }),
        }
      );

      if (response.ok) {
        setReplyContent("");
        setShowReplyModal(false);
        fetchThreads();
        if (showReplies) {
          fetchReplies();
        }
      } else {
        throw new Error("Failed to submit reply");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Timeline>
      <Timeline.Item>
        <div className="p-1 relative">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={toggleLike}
          >
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </div>
          <div className="flex items-center mb-2">
            <Avatar img={thread.author.profilePicture} className="mr-2" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{thread.title}</h2>
              <div className="flex">
                <p className="text-sm text-gray-500 mr-4">
                  {thread.author.role}
                </p>
                <p className="text-sm text-gray-500">
                  {moment(thread.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
          <p>{thread.content}</p>
          <div className="flex mt-2 gap-2">
            <p
              className="text-xs text-gray-500 cursor-pointer"
              onClick={() => setShowReplyModal(true)}
            >
              Reply
            </p>
            <p
              className="text-xs text-gray-500 cursor-pointer"
              onClick={toggleReplies}
            >
              {showReplies ? "Hide" : "Replies"}
            </p>
            <p className="text-xs text-gray-500">{likeCount} likes</p>
            <p className="text-xs text-gray-500">Share</p>
          </div>

          {showReplies && (
            <div className="mt-2 border border-gray-200 p-2 rounded">
              {replies
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2)
                .map((comment) => (
                  <div key={comment._id} className="flex items-center mt-2">
                    {comment.author ? (
                      <>
                        <Avatar
                          img={comment.author.profilePicture}
                          className="mr-2"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {comment.author.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {moment(comment.createdAt).fromNow()}
                          </p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <p className="text-sm">{comment.content}</p>
                        <p className="text-xs text-gray-500">
                          {moment(comment.createdAt).fromNow()}
                        </p>
                        <p className="text-xs text-gray-500 italic">
                          Anonymous
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}

          <Modal show={showReplyModal} onClose={() => setShowReplyModal(false)}>
            <Modal.Header>Reply to Thread</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="reply" value="Your Reply" />
                  <TextInput
                    id="reply"
                    name="reply"
                    value={replyContent}
                    onChange={handleReplyChange}
                    placeholder="Enter your reply"
                    required
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleReplySubmit}>Submit</Button>
              <Button color="gray" onClick={() => setShowReplyModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Timeline.Item>
    </Timeline>
  );
};

export default ThreadCard;
