import { useAppContext } from "../context/AppContext";
import capitalize from "../utils/capitalize";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	PieChart,
	Pie,
	Cell,
	Legend,
	ResponsiveContainer,
} from "recharts";

const COLORS = [
	"#3fa129", // grass
	"#9141cb", // poison
	"#e62829", // fire
	"#81b9ef", // flying
	"#2980ef", // water
	"#91a119", // bug
	"#9fa19f", // normal
	"#fac000", // electric
	"#905020", // ground
	"#ef70ef", // fairy
	"#ff8000", // fighting
	"#ef4179", // psychic
	"#afa981", // rock
	"#60a1b8", // steel
	"#3dcef3", // ice
	"#704170", // ghost
	"#5060e1", // dragon
	"#624d4e", // dark
];

const PokemonCharts = () => {
	const { data } = useAppContext();

	if (!data || data.length === 0) return null;

	const nameLengthData = data.map((pokemon) => ({
		name: pokemon.name,
		nameLength: pokemon.name.length,
	}));

	const typeCounts = {};
	data.forEach((pokemon) => {
		pokemon.types.forEach((t) => {
			const typeName = t.type.name;
			typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
		});
	});

	const typeData = Object.keys(typeCounts).map((type) => ({
		name: type,
		value: typeCounts[type],
	}));

	return (
		<div className="chart-container">
			<p>
				Here's a graph of the name lengths of Pokémon vs. their types. Try using
				the filters above to change which Pokémon are shown and watch the graphs
				update! Shorter names? Fewer types? Maybe Legendary Pokémon have weird
				names? That's an interesting story, right...?
			</p>

			{/* Bar Chart */}
			<div className="chart-box">
				<h3>Name Lengths</h3>
				<ResponsiveContainer width="100%" height={200}>
					<BarChart data={nameLengthData}>
						<XAxis dataKey="name" />
						<YAxis />
						<Bar dataKey="nameLength" fill="#8884d8" />
						<Tooltip />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Pie Chart */}
			<div className="chart-box">
				<h3>Type Distribution</h3>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={typeData}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={100}
							fill="#8884d8"
							label={({ name }) => capitalize(name)}
						>
							{typeData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default PokemonCharts;
