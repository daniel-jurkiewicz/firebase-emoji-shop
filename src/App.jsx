import { useEffect, useState } from "react";
import {
	db,
	registerUserWithEmail,
	loginUserWithEmail,
	logoutUser,
	auth,
} from "./db";
import { collection, getDocs, addDoc } from "firebase/firestore";

const makeGroupBy = (attrName) => (items) => {
	return items.reduce((acc, curr) => {
		if (!acc[curr[attrName]]) {
			acc[curr[attrName]] = [];
		}
		acc[curr[attrName]].push(curr);
		return acc;
	}, {});
};

function App() {
	const [data, setData] = useState(null);
	const [activeProduct, setActiveProduct] = useState(null);
	const [itemsInCart, setItemsInCart] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const [showSummary, setShowSummary] = useState(false);
	const [showRegistrationForm, setShowRegistrationForm] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [city, setCity] = useState("");
	const [currentUser, setCurrentUser] = useState(null);

	const getData = async () => {
		const productSnapshot = await getDocs(collection(db, "products"));
		const productList = productSnapshot.docs.map((doc) => doc.data());
		setData(productList);
	};

	useEffect(() => {
		return auth.onAuthStateChanged(setCurrentUser);
	}, []);

	useEffect(() => {
		getData();
	}, []);

	const handleRegister = (e) => {
		e.preventDefault();
		registerUserWithEmail(username, email, password, city);
		setUsername("");
		setEmail("");
		setPassword("");
		setCity("");
	};

	const handleLogin = (e) => {
		e.preventDefault();
		loginUserWithEmail(email, password);
		setEmail("");
		setPassword("");
	};

	const handleLogout = (e) => {
		e.preventDefault();
		logoutUser();
	};

	const handleOrder = () => {
		addDoc(collection(db, "users", currentUser.uid, "orders"), {
			orderDate: new Date().toLocaleDateString(),
			orderItems: itemsInCart,
			orderValue: Number([
				itemsInCart
					.map((item) => item.value)
					.reduce((a, b) => a + b, 0) / 100,
			]),
		});
		setItemsInCart([]);
	};

	const groupByItem = makeGroupBy("item");

	const getSummary = () =>
		Object.entries(groupByItem(itemsInCart)).map(([key, value]) => {
			const firstItem = value[0];
			return (
				<li key={key}>
					{firstItem.item} / {(firstItem.value * value.length) / 100}{" "}
					{firstItem.currency} ({value.length})
				</li>
			);
		});

	return (
		<div>
			<h1>Firebase Emoji Shop</h1>
			{currentUser ? (
				<>
					<p>Hello, {currentUser.email}</p>
					<button onClick={handleLogout}>Logout</button>
				</>
			) : (
				<>
					<button onClick={() => setShowLoginForm(!showLoginForm)}>
						Login
					</button>
					<button>Register</button>
					{!showLoginForm ? null : (
						<div>
							<form onSubmit={handleLogin}>
								<input
									type="email"
									value={email}
									placeholder="E-mail"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<input
									type="password"
									value={password}
									placeholder="Password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<button type="submit">Sign In</button>
							</form>
						</div>
					)}
				</>
			)}

			<hr />
			<div className="flex">
				<div className="cart">
					<div className="flex cart-header">
						<button onClick={() => setShowCart(!showCart)}>
							🛒
						</button>
						<p>Items in the cart: {itemsInCart.length}</p>
					</div>
					{showCart && (
						<>
							{!showSummary ? (
								<ol>
									{itemsInCart.map((item) => (
										<li>{item.item}</li>
									))}
								</ol>
							) : (
								<ol>{getSummary()}</ol>
							)}
							<button
								onClick={() => setShowSummary(!showSummary)}
							>
								{!showSummary
									? "Order Summary"
									: "Back to Cart"}
							</button>
							{!showSummary && (
								<>
									{!currentUser ? (
										<button
											onClick={() =>
												setShowRegistrationForm(
													!showRegistrationForm,
												)
											}
										>
											Register to Order
										</button>
									) : (
										<button onClick={handleOrder}>
											Order Now
										</button>
									)}
									{!showRegistrationForm ? null : (
										<div>
											<form onSubmit={handleRegister}>
												<input
													type="text"
													value={username}
													placeholder="Username"
													onChange={(e) =>
														setUsername(
															e.target.value,
														)
													}
												/>
												<input
													type="email"
													value={email}
													placeholder="E-mail"
													onChange={(e) =>
														setEmail(e.target.value)
													}
												/>
												<input
													type="password"
													value={password}
													placeholder="Password"
													onChange={(e) =>
														setPassword(
															e.target.value,
														)
													}
												/>
												<input
													type="text"
													value={city}
													placeholder="City"
													onChange={(e) =>
														setCity(e.target.value)
													}
												/>
												<button type="submit">
													Register New User
												</button>
											</form>
										</div>
									)}
								</>
							)}
							<p>
								Total price:{" "}
								{itemsInCart
									.map((item) => item.value)
									.reduce((a, b) => a + b, 0) / 100}
								{" PLN"}
							</p>
						</>
					)}
				</div>
				<div className="product-list">
					<ol>
						{data?.map((product) => (
							<li
								key={product.id}
								onClick={() => setActiveProduct(product)}
							>
								{product.name} Emoji
								<button
									onClick={() => setActiveProduct(product)}
								>
									Show Details
								</button>
							</li>
						))}
					</ol>
					{activeProduct && (
						<div className="product-details">
							<h3>{activeProduct.name}</h3>
							<p className="emoji">{activeProduct.item}</p>
							<p>
								{activeProduct.value / 100}{" "}
								{activeProduct.currency}
							</p>
							<button
								onClick={() =>
									setItemsInCart([
										...itemsInCart,
										activeProduct,
									])
								}
							>
								Add to Cart
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
