import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const PostDetails = () => {
	const { postId } = useParams();

	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [newComment, setNewComment] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [editedTitle, setEditedTitle] = useState("");
	const [editedContent, setEditedContent] = useState("");

	useEffect(() => {
		const fetchPost = async () => {
			const { data, error } = await supabase
				.from("posts")
				.select("*")
				.eq("id", postId)
				.single();

			if (error) {
				console.error("Error fetching post:", error);
			} else {
				setPost(data);
				setEditedTitle(data.title);
				setEditedContent(data.content);
			}
			setLoading(false);
		};

		fetchPost();
	}, [postId]);

	const handleAddComment = async () => {
		if (!newComment.trim()) return;

		const updatedComments = [...(post.comments || []), newComment.trim()];

		const { error } = await supabase
			.from("posts")
			.update({ comments: updatedComments })
			.eq("id", post.id);

		if (!error) {
			setPost({ ...post, comments: updatedComments });
			setNewComment("");
		}
	};

	const handleSaveEdit = async () => {
		const { data, error } = await supabase
			.from("posts")
			.update({
				title: editedTitle,
				content: editedContent,
			})
			.eq("id", post.id)
			.select()
			.single();

		if (!error) {
			setPost(data);
			setEditMode(false);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (!post) return <p>Post not found.</p>;

	return (
		<div className="forum-container">
			{editMode ? (
				<>
					<input
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						className="form-input"
					/>
					<textarea
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
						className="form-textarea"
					/>
					<button className="cool-btn" onClick={handleSaveEdit}>
						Save
					</button>
				</>
			) : (
				<>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
					{post.image && <img src={post.image} alt="Post" width="200" />}
					<p>
						👍 {post.upvotes} — {new Date(post.created_at).toLocaleString()}
					</p>
					<button className="cool-btn" onClick={() => setEditMode(true)}>
						Edit Post
					</button>
				</>
			)}

			{/* Comments */}
			<div style={{ marginTop: "2rem" }}>
				<h3>Comments</h3>
				<ul>
					{(post.comments || []).map((c, i) => (
						<li key={i}>{c}</li>
					))}
				</ul>
				<input
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="Leave a comment"
					className="form-input"
				/>
				<button className="cool-btn" onClick={handleAddComment}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default PostDetails;
