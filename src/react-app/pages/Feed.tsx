import { useState } from "react";
import { Heart, MessageCircle, Share2, Trophy, Award, Calendar, Users, TrendingUp, MoreHorizontal, Image as ImageIcon, Video, X, Send, Upload } from "lucide-react";

interface Comment {
  id: number;
  postId: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface FeedItem {
  id: number;
  type: "match_result" | "achievement" | "team_update" | "player_milestone" | "media";
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
  details?: {
    score?: string;
    team1?: string;
    team2?: string;
    achievement?: string;
    mediaType?: "image" | "video";
    mediaUrl?: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  commentsList?: Comment[];
}

export default function SocialFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: 1,
      type: "match_result",
      user: { name: "Thunder Bolts", avatar: "🏆" },
      timestamp: "2 hours ago",
      content: "What a match! Thunder Bolts defeated Lightning Stars by 45 runs in an intense T20 showdown!",
      details: {
        score: "185/6 vs 140/10",
        team1: "Thunder Bolts",
        team2: "Lightning Stars",
      },
      likes: 124,
      comments: 18,
      isLiked: false,
      commentsList: [
        {
          id: 1,
          postId: 1,
          user: { name: "Rohit Patel", avatar: "RP" },
          content: "What a match! Amazing performance by the team! 🏏",
          timestamp: "1 hour ago",
        },
        {
          id: 2,
          postId: 1,
          user: { name: "Virat Sharma", avatar: "VS" },
          content: "Thunder Bolts played exceptionally well!",
          timestamp: "50 mins ago",
        },
      ],
    },
    {
      id: 2,
      type: "achievement",
      user: { name: "Rahul Sharma", avatar: "👤" },
      timestamp: "5 hours ago",
      content: "Congratulations on scoring your maiden century! 🎉",
      details: {
        achievement: "Century Maker - Scored 127* runs",
      },
      likes: 89,
      comments: 12,
      isLiked: true,
    },
    {
      id: 3,
      type: "media",
      user: { name: "Phoenix Blazers", avatar: "🔥" },
      timestamp: "1 day ago",
      content: "Check out these amazing highlights from yesterday's practice session!",
      details: {
        mediaType: "video",
        mediaUrl: "#",
      },
      likes: 156,
      comments: 24,
      isLiked: false,
    },
    {
      id: 4,
      type: "team_update",
      user: { name: "Royal Warriors", avatar: "👑" },
      timestamp: "2 days ago",
      content: "Welcome 3 new players to our squad! Ready to dominate this season 💪",
      likes: 67,
      comments: 9,
      isLiked: false,
    },
    {
      id: 5,
      type: "player_milestone",
      user: { name: "Vikram Singh", avatar: "👤" },
      timestamp: "3 days ago",
      content: "Reached 100 wickets milestone in my cricket career! Thank you to all my teammates and supporters! 🙏",
      details: {
        achievement: "100 Career Wickets",
      },
      likes: 203,
      comments: 31,
      isLiked: true,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FeedItem | null>(null);
  const [newComment, setNewComment] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [postWithImage, setPostWithImage] = useState("");

  const handleLike = (id: number) => {
    setFeedItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const handleComment = (id: number) => {
    const post = feedItems.find(item => item.id === id);
    if (post) {
      setSelectedPost(post);
      setShowCommentModal(true);
    }
  };

  const handleShare = (id: number) => {
    // Copy link to clipboard
    const postUrl = `${window.location.origin}/feed/post/${id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Share this post!');
    });
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const newFeedItem: FeedItem = {
        id: feedItems.length + 1,
        type: "team_update",
        user: { name: "You", avatar: "U" },
        timestamp: "Just now",
        content: newPost,
        likes: 0,
        comments: 0,
        isLiked: false,
      };
      setFeedItems([newFeedItem, ...feedItems]);
      setNewPost("");
      alert('Post shared successfully!');
    } else {
      alert('Please write something to post!');
    }
  };

  const handleAddImage = () => {
    setShowImageUpload(true);
  };

  const handleAddVideo = () => {
    alert('Video upload feature coming soon! You will be able to share match highlights and videos.');
  };

  const handleAddMatchResult = () => {
    alert('Match result feature coming soon! You will be able to share detailed match scores and statistics.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostWithImage = () => {
    if (postWithImage.trim() || imagePreview) {
      const newFeedItem: FeedItem = {
        id: feedItems.length + 1,
        type: "media",
        user: { name: "You", avatar: "U" },
        timestamp: "Just now",
        content: postWithImage.trim() || "Shared a photo",
        details: {
          mediaType: "image",
          mediaUrl: imagePreview || "",
        },
        likes: 0,
        comments: 0,
        isLiked: false,
        commentsList: [],
      };
      setFeedItems([newFeedItem, ...feedItems]);
      setPostWithImage("");
      setImagePreview(null);
      setShowImageUpload(false);
      alert('Photo posted successfully!');
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && selectedPost) {
      const comment: Comment = {
        id: Date.now(),
        postId: selectedPost.id,
        user: { name: "You", avatar: "U" },
        content: newComment.trim(),
        timestamp: "Just now",
      };

      setFeedItems(prev =>
        prev.map(item =>
          item.id === selectedPost.id
            ? {
                ...item,
                comments: item.comments + 1,
                commentsList: [...(item.commentsList || []), comment],
              }
            : item
        )
      );

      setNewComment("");
      // Don't close modal, allow multiple comments
    }
  };

  const handleLoadMore = () => {
    const moreFeedItems: FeedItem[] = [
      {
        id: feedItems.length + 1,
        type: "match_result",
        user: { name: "Storm Riders", avatar: "⚡" },
        timestamp: "4 days ago",
        content: "Close victory! Storm Riders won by 2 wickets in the final over!",
        details: {
          score: "156/8 vs 155/7",
          team1: "Storm Riders",
          team2: "Phoenix Blazers",
        },
        likes: 92,
        comments: 15,
        isLiked: false,
      },
      {
        id: feedItems.length + 2,
        type: "player_milestone",
        user: { name: "Priya Patel", avatar: "👤" },
        timestamp: "5 days ago",
        content: "Best bowling figures of the season! 5 wickets for 18 runs! 🎯",
        details: {
          achievement: "5-Wicket Haul",
        },
        likes: 178,
        comments: 22,
        isLiked: false,
      },
    ];
    setFeedItems([...feedItems, ...moreFeedItems]);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "match_result":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "achievement":
        return <Award className="w-5 h-5 text-purple-500" />;
      case "team_update":
        return <Users className="w-5 h-5 text-blue-500" />;
      case "player_milestone":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "media":
        return <ImageIcon className="w-5 h-5 text-pink-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 page-transition">
      {/* Header */}
      <div className="mb-4 sm:mb-8 fade-in">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Activity Feed</h1>
        <p className="text-sm sm:text-base text-gray-600">Stay updated with latest cricket activities</p>
      </div>

      {/* Create Post */}
      <div className="cricket-card p-4 sm:p-6 mb-4 sm:mb-6 slide-up">
        <div className="flex items-start space-x-2 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cricket-green-500 to-cricket-blue-500 rounded-full flex items-center justify-center text-white text-base sm:text-xl font-bold flex-shrink-0">
            U
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your cricket moment..."
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2 sm:mt-3">
              <div className="flex space-x-1 sm:space-x-2">
                <button 
                  onClick={handleAddImage}
                  className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors duration-200 touch-manipulation" 
                  aria-label="Add image"
                >
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={handleAddVideo}
                  className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors duration-200 touch-manipulation" 
                  aria-label="Add video"
                >
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={handleAddMatchResult}
                  className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors duration-200 touch-manipulation" 
                  aria-label="Add match result"
                >
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <button 
                onClick={handlePost}
                className="cricket-btn-primary px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Items */}
      <div className="space-y-4 sm:space-y-6">
        {feedItems.map((item, index) => (
          <div
            key={item.id}
            className="cricket-card p-4 sm:p-6 scale-in hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cricket-green-400 to-cricket-blue-400 rounded-full flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  {item.user.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">{item.user.name}</h3>
                    {getActivityIcon(item.type)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">{item.timestamp}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 active:text-gray-800 transition-colors duration-200 touch-manipulation flex-shrink-0" aria-label="More options">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Post Content */}
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{item.content}</p>

            {/* Match Result Details */}
            {item.type === "match_result" && item.details && (
              <div className="bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50 rounded-lg p-4 mb-4 border border-cricket-green-200">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <div className="font-bold text-gray-800">{item.details.team1}</div>
                  </div>
                  <div className="px-4">
                    <div className="text-sm text-gray-600 mb-1">Final Score</div>
                    <div className="font-bold text-cricket-green-700">{item.details.score}</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-bold text-gray-800">{item.details.team2}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Achievement Badge */}
            {(item.type === "achievement" || item.type === "player_milestone") && item.details?.achievement && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-4 border-2 border-yellow-200">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-gray-800">{item.details.achievement}</div>
                    <div className="text-sm text-gray-600">Achievement Unlocked! 🎉</div>
                  </div>
                </div>
              </div>
            )}

            {/* Media Preview */}
            {item.type === "media" && item.details?.mediaType && (
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 overflow-hidden group cursor-pointer">
                {item.details.mediaUrl ? (
                  <>
                    {item.details.mediaType === "image" ? (
                      <img 
                        src={item.details.mediaUrl} 
                        alt="Post media" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.details.mediaType === "video" ? (
                      <Video className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                    ) : (
                      <ImageIcon className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                    )}
                  </div>
                )}
                {!item.details.mediaUrl && (
                  <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity duration-200"></div>
                )}
              </div>
            )}

            {/* Interaction Buttons */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
              <button
                onClick={() => handleLike(item.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 touch-manipulation ${
                  item.isLiked
                    ? "text-red-500 bg-red-50"
                    : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${item.isLiked ? "fill-current" : ""}`} />
                <span className="text-sm sm:text-base font-medium">{item.likes}</span>
              </button>
              <button 
                onClick={() => handleComment(item.id)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">{item.comments}</span>
              </button>
              <button 
                onClick={() => handleShare(item.id)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-6 sm:mt-8">
        <button 
          onClick={handleLoadMore}
          className="cricket-btn-secondary px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base hover:scale-105 transition-transform duration-200"
        >
          Load More Activities
        </button>
      </div>

      {/* Image Upload Modal - Full Screen */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-in fade-in duration-200">
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
              <div className="flex items-center space-x-3">
                <ImageIcon className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Upload Photo</h2>
              </div>
              <button
                onClick={() => {
                  setShowImageUpload(false);
                  setImagePreview(null);
                  setPostWithImage("");
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12 space-y-8">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Photo</label>
                {!imagePreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cricket-green-500 hover:bg-cricket-green-50 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                <textarea
                  value={postWithImage}
                  onChange={(e) => setPostWithImage(e.target.value)}
                  placeholder="Write a caption for your photo..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  onClick={() => {
                    setShowImageUpload(false);
                    setImagePreview(null);
                    setPostWithImage("");
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostWithImage}
                  disabled={!imagePreview}
                  className="px-6 py-3 bg-cricket-green-600 hover:bg-cricket-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal - Full Screen */}
      {showCommentModal && selectedPost && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-200">
          <div className="flex flex-col h-screen">
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Comments</h2>
              </div>
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedPost(null);
                  setNewComment("");
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Post Preview */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cricket-green-400 to-cricket-blue-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {selectedPost.user.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{selectedPost.user.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedPost.content}</p>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-6 sm:p-8 space-y-4">
              {selectedPost.commentsList && selectedPost.commentsList.length > 0 ? (
                selectedPost.commentsList.map((comment, index) => (
                  <div key={comment.id} className="flex items-start space-x-3 fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="w-8 h-8 bg-gradient-to-br from-cricket-green-500 to-cricket-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {comment.user.avatar}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-gray-800">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No comments yet</p>
                  <p className="text-sm text-gray-400 mt-1">Be the first to comment!</p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <div className="flex items-center space-x-3 max-w-4xl mx-auto">
                <div className="w-10 h-10 bg-gradient-to-br from-cricket-green-500 to-cricket-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  U
                </div>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="w-10 h-10 cricket-gradient rounded-full flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
