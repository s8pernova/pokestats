import { useState } from "react";

const Forum = () => {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("date");

	return (
		<div className="forum-container">
			<h2 className="forum-title">Community Forum</h2>

			{/* CREATE POST FORM */}
			<form
				className="post-form"
				onSubmit={(e) => {
					e.preventDefault();
					const title = e.target.title.value.trim();
					const content = e.target.content.value.trim();
					const image = e.target.image.value.trim();

					if (title) {
						const newPost = {
							id: crypto.randomUUID(),
							title,
							content,
							image,
							upvotes: 0,
							date: new Date().toISOString(),
							comments: [],
						};

						setPosts([newPost, ...posts]);
						e.target.reset();
					}
				}}
			>
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
					{/* className="init-post-actions" */}
					<input
						name="image"
						placeholder="Image URL"
						className="form-input cool-btn upload-img"
					/>
					{/* <button type="button" className="cool-btn upload-img">
						<i className="fa-solid fa-upload"></i>
					</button> */}
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
							: new Date(b.date) - new Date(a.date)
					)
					.map((post) => (
						<li key={post.id} className="post-card">
							<Link to={`/post/${post.id}`}>
								<h3 className="post-text post-title">{post.title}</h3>
							</Link>
							<p className="post-text post-content">{post.content}</p>
							<img src={post.image} alt={post.title} />
							<div className="post-meta">
								<span>{new Date(post.date).toLocaleString()}</span>
								<span>👍 {post.upvotes}</span>
							</div>
							<div className="post-actions">
								<button
									className="def-btn upvote-btn"
									onClick={() =>
										setPosts(
											posts.map((p) =>
												p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p
											)
										)
									}
								>
									Upvote
								</button>
								<button
									className="def-btn delete-btn"
									onClick={() =>
										setPosts(posts.filter((p) => p.id !== post.id))
									}
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
