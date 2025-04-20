import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAppContext } from "../context/AppContext";

const EditPokemon = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		formData,
		setFormData,
		spriteIndex,
		setSpriteIndex,
		showNotification,
		setShowNotification,
	} = useAppContext();

	const [loading, setLoading] = useState(true);
	const [notificationMessage, setNotificationMessage] = useState("");

	const spriteOptions = [
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
	];
	const currentSprite = spriteOptions[spriteIndex];

	// Fetch Pokémon on load
	useEffect(() => {
		const fetchPokemon = async () => {
			const { data, error } = await supabase
				.from("Pokemon")
				.select("*")
				.eq("id", parseInt(id))
				.single();

			if (error) {
				console.error("Failed to fetch Pokémon:", error.message);
				return;
			}

			setFormData({
				name: data.name,
				type: data.type,
				level: data.level,
				hp: data.hp,
				description: data.description,
			});

			const foundIndex = spriteOptions.indexOf(data.sprite_url);
			if (foundIndex !== -1) setSpriteIndex(foundIndex);

			setLoading(false);
		};

		fetchPokemon();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { error } = await supabase
			.from("Pokemon")
			.update({
				name: formData.name,
				type: formData.type,
				level: parseInt(formData.level),
				hp: parseInt(formData.hp),
				description: formData.description,
				sprite_url: currentSprite,
			})
			.eq("id", id);

		if (error) {
			console.error("Failed to update Pokémon:", error.message);
		} else {
			setNotificationMessage("Pokémon updated!");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
				navigate("/team");
			}, 2000);
		}
	};

	const handleDelete = async () => {
		const confirmed = confirm("Are you sure you want to delete this Pokémon?");
		if (!confirmed) return;

		const { error } = await supabase.from("Pokemon").delete().eq("id", id);
		if (error) {
			console.error("Delete failed:", error.message);
		} else {
			setNotificationMessage("Pokémon deleted!");
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
				navigate("/team");
			}, 2000);
		}
	};

	const rotateLeft = () => {
		setSpriteIndex(
			(prev) => (prev - 1 + spriteOptions.length) % spriteOptions.length
		);
	};

	const rotateRight = () => {
		setSpriteIndex((prev) => (prev + 1) % spriteOptions.length);
	};

	if (loading) return <p>Loading Pokémon...</p>;

	return (
		<div className="creator-container pixel-font">
			<div className={`notification-box ${showNotification ? "show" : ""}`}>
				{notificationMessage}
			</div>

			<h2>Edit Your Pokémon</h2>

			<div className="sprite-container">
				<button onClick={rotateLeft} className="cool-btn square">
					⬅️
				</button>
				<img src={currentSprite} alt="Sprite" className="pixel-img" />
				<button onClick={rotateRight} className="cool-btn square">
					➡️
				</button>
			</div>

			<form onSubmit={handleSubmit}>
				<label>
					<span>Name:</span>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</label>
				<br />

				<label>
					<span>Type:</span>
					<select
						name="type"
						value={formData.type}
						onChange={handleChange}
						required
					>
						<option value="">Select Type</option>
						<option value="Grass">Grass</option>
						<option value="Poison">Poison</option>
						<option value="Fire">Fire</option>
						<option value="Flying">Flying</option>
						<option value="Water">Water</option>
						<option value="Bug">Bug</option>
						<option value="Normal">Normal</option>
						<option value="Electric">Electric</option>
						<option value="Ground">Ground</option>
						<option value="Fairy">Fairy</option>
						<option value="Fighting">Fighting</option>
						<option value="Psychic">Psychic</option>
						<option value="Rock">Rock</option>
						<option value="Steel">Steel</option>
						<option value="Ice">Ice</option>
						<option value="Ghost">Ghost</option>
						<option value="Dragon">Dragon</option>
						<option value="Dark">Dark</option>
					</select>
				</label>
				<br />

				<label>
					<span>Level:</span>
					<input
						type="number"
						name="level"
						min="1"
						max="100"
						value={formData.level}
						onChange={handleChange}
						required
					/>
				</label>
				<br />

				<label>
					<span>HP:</span>
					<input
						type="number"
						name="hp"
						value={formData.hp}
						onChange={handleChange}
					/>
				</label>
				<br />

				<label>
					<span>Description:</span>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</label>
				<br />

				<div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
					<button type="submit" className="cool-btn">
						Update
					</button>
					<button
						type="button"
						onClick={handleDelete}
						className="cool-btn"
						style={{ backgroundColor: "#dc3545", color: "white" }}
					>
						Delete
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditPokemon;
