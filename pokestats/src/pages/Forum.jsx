import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Forum = () => {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("date");

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		const { data, error } = await supabase
			.from("Posts")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching posts:", error);
		} else {
			setPosts(data || []);
		}
	};

	const handleCreatePost = async (e) => {
		e.preventDefault();
		const title = e.target.title.value.trim();
		const content = e.target.content.value.trim();
		const image = e.target.image.value.trim();

		if (title) {
			const newPost = {
				title,
				content,
				image,
				upvotes: 0,
				comments: [],
				created_at: new Date().toISOString(),
			};

			// Insert the post into Supabase
			const { data, error } = await supabase
				.from("Posts")
				.insert([newPost])
				.select();

			if (error) {
				console.error("Error creating post:", error);
			} else {
				// Add the returned post (with ID) to the state
				setPosts([data[0], ...posts]);
				e.target.reset();
			}
		}
	};

	const handleUpvote = async (postId) => {
		// Find the post to update
		const postToUpdate = posts.find((p) => p.id === postId);
		if (!postToUpdate) return;

		const newUpvoteCount = postToUpdate.upvotes + 1;

		// Update the post in Supabase
		const { error } = await supabase
			.from("Posts")
			.update({ upvotes: newUpvoteCount })
			.eq("id", postId);

		if (error) {
			console.error("Error upvoting post:", error);
		} else {
			// Update the post in local state
			setPosts(
				posts.map((p) =>
					p.id === postId ? { ...p, upvotes: newUpvoteCount } : p
				)
			);
		}
	};

	const handleDeletePost = async (postId) => {
		// Delete the post from Supabase
		const { error } = await supabase.from("Posts").delete().eq("id", postId);

		if (error) {
			console.error("Error deleting post:", error);
		} else {
			// Remove the post from local state
			setPosts(posts.filter((p) => p.id !== postId));
		}
	};

	return (
		<div className="forum-container">
			<h2 className="forum-title">Community Forum</h2>

			{/* CREATE POST FORM */}
			<form className="post-form" onSubmit={handleCreatePost}>
				<input
					name="title"
					placeholder="Post title"
					className="form-input"
					required
				/>
				<textarea
					name="content"
					placeholder="Say something..."
					className="form-textarea"
				/>
				<div>
					<input
						name="image"
						placeholder="Image URL"
						className="form-input cool-btn upload-img"
					/>
					<button type="submit" className="cool-btn">
						Create Post
					</button>
				</div>
			</form>

			{/* SEARCH AND SORT CONTROLS */}
			<div className="controls">
				<input
					type="text"
					placeholder="Search posts..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="form-input"
				/>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="form-select"
				>
					<option value="date">Newest</option>
					<option value="upvotes">Most Upvoted</option>
				</select>
			</div>

			{/* POST FEED */}
			<ul className="post-feed">
				{posts
					.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
					.sort((a, b) =>
						sortBy === "upvotes"
							? b.upvotes - a.upvotes
							: new Date(b.created_at) - new Date(a.created_at)
					)
					.map((post) => (
						<li key={post.id} className="post-card">
							<Link to={`/forum/post/${post.id}`}>
								<h3 className="post-text post-title">{post.title}</h3>
							</Link>
							<p className="post-text post-content">{post.content}</p>
							{post.image && <img src={post.image} alt={post.title} />}
							<div className="post-meta">
								<span>{new Date(post.created_at).toLocaleString()}</span>
								<span>👍 {post.upvotes}</span>
							</div>
							<div className="post-actions">
								<button
									className="def-btn upvote-btn"
									onClick={() => handleUpvote(post.id)}
								>
									Upvote
								</button>
								<button
									className="def-btn delete-btn"
									onClick={() => handleDeletePost(post.id)}
								>
									Delete
								</button>
								<button
									onClick={() => alert("Under construction!")}
									className="def-btn comment-btn"
								>
									Comment
								</button>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Forum;
