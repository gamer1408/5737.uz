import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { User, Settings, Heart, ShoppingBag, LogOut, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { correctAuth, type User } from "@/lib/CorrectAuth";

export default function SignInModal({ onSignIn }: { onSignIn: () => void }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const user = correctAuth.getUser();
		if (user) {
			setIsSignedIn(true);
			setCurrentUser(user);
		}
	}, []);

	const handleSignIn = (user: User) => {
		setCurrentUser(user);
		setIsSignedIn(true);
		setIsOpen(false);
		
		// Show welcome toast with animation
		setTimeout(() => {
			toast.success(
				<div className="flex items-center gap-3">
					<span className="text-2xl animate-bounce">🤗</span>
					<div>
						<div className="font-semibold text-blue-600">Xush kelibsiz, {user.profile.firstName}!</div>
						<div className="text-sm text-muted-foreground">Muvaffaqiyatli kirdingiz</div>
					</div>
				</div>,
				{ duration: 4000 }
			);
		}, 300);
		
		onSignIn();
	};

	const handleSignOut = () => {
		correctAuth.signOut();
		setCurrentUser(null);
		setIsSignedIn(false);
		setIsOpen(false);
		
		// Show goodbye toast with animation
		setTimeout(() => {
			toast(
				<div className="flex items-center gap-3">
					<span className="text-2xl animate-pulse">😢</span>
					<div>
						<div className="font-semibold text-orange-600">Afsus, hayr!</div>
						<div className="text-sm text-muted-foreground">Tez orada qaytishingizni kutamiz</div>
					</div>
				</div>,
				{ duration: 3000 }
			);
		}, 300);
	};

	const menuItems = [
		{ icon: Heart, label: "Yoqtirilganlar", href: "/liked" },
		{ icon: ShoppingBag, label: "Buyurtmalar", href: "/orders" },
		{ icon: Settings, label: "Sozlamalar", href: "/settings" },
	];

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button className="w-full h-full flex items-center justify-center" aria-label="User Menu">
					<User className="w-5 h-5" />
				</button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				{isSignedIn ? (
					<UserMenu 
						currentUser={currentUser} 
						menuItems={menuItems} 
						onSignOut={handleSignOut}
						onClose={() => setIsOpen(false)}
					/>
				) : (
					<AuthForms 
						showSignUp={showSignUp}
						setShowSignUp={setShowSignUp}
						onSignIn={handleSignIn}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}

function UserMenu({ currentUser, menuItems, onSignOut, onClose }: any) {
	return (
		<div className="space-y-4">
			{/* Profile Header */}
			<div className="text-center pb-4 border-b">
				<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
					<User className="w-8 h-8 text-white" />
				</div>
				<h3 className="font-semibold text-lg">
					{currentUser?.profile?.firstName} {currentUser?.profile?.lastName}
				</h3>
				<p className="text-sm text-muted-foreground">{currentUser?.email}</p>
				<div className="text-xs text-muted-foreground mt-1">
					{currentUser?.profile?.phone && (
						<div className="flex items-center justify-center gap-1">
							<Phone className="w-3 h-3" />
							{currentUser.profile.phone}
						</div>
					)}
				</div>
			</div>
			
			{/* Menu Items */}
			<div className="space-y-2">
				{menuItems.map((item: any) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							to={item.href}
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
							onClick={onClose}
						>
							<Icon className="w-5 h-5 text-muted-foreground" />
							<span>{item.label}</span>
						</Link>
					);
				})}
				<button
					onClick={onSignOut}
					className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors w-full text-left text-red-600"
				>
					<LogOut className="w-5 h-5" />
					<span>Chiqish</span>
				</button>
			</div>
		</div>
	);
}

function AuthForms({ showSignUp, setShowSignUp, onSignIn }: any) {
	return (
		<div className="space-y-6">
			{showSignUp ? (
				<SignUpForm onSignUp={onSignIn} onShowSignIn={() => setShowSignUp(false)} />
			) : (
				<SignInForm onSignIn={onSignIn} onShowSignUp={() => setShowSignUp(true)} />
			)}
		</div>
	);
}

function SignInForm({ onSignIn, onShowSignUp }: any) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		
		try {
			const result = await correctAuth.signIn(email, password);
			
			if (result.success && result.user) {
				onSignIn(result.user);
			} else {
				setError(result.error || "Kirish xatosi");
				toast.error(result.error || "Email yoki parol noto'g'ri!");
			}
		} catch (error) {
			setError("Ulanish xatosi - mahalliy rejimda ishlayapti");
			toast.error("Server bilan aloqa yo'q, mahalliy ma'lumotlar ishlatilmoqda");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold text-center mb-6">Kirish</h2>
			{error && <div className="text-red-600 text-sm mb-4">{error}</div>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					required
				/>
				<Input
					type="password"
					placeholder="Parol"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					required
				/>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? "Kirilyapti..." : "Kirish"}
				</Button>
			</form>
			<p className="text-center text-sm text-muted-foreground mt-4">
				Hisobingiz yo'qmi? 
				<button 
					type="button" 
					className="text-primary hover:underline ml-1"
					onClick={onShowSignUp}
				>
					Ro'yxatdan o'tish
				</button>
			</p>
		</div>
	);
}

function SignUpForm({ onSignUp, onShowSignIn }: any) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		
		try {
			const result = await correctAuth.signUp({ name, email, password, phone });
			
			if (result.success && result.user) {
				toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
				onSignUp(result.user);
			} else {
				setError(result.error || "Ro'yxatdan o'tish xatosi");
				toast.error(result.error || "Ro'yxatdan o'tish xatosi!");
			}
		} catch (error) {
			setError("Ulanish xatosi - mahalliy rejimda ishlayapti");
			toast.error("Server bilan aloqa yo'q, mahalliy ma'lumotlar ishlatilmoqda");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h2>
			{error && <div className="text-red-600 text-sm mb-4">{error}</div>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					type="text"
					placeholder="To'liq ism"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					type="tel"
					placeholder="Telefon raqam (ixtiyoriy)"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="Parol"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? "Ro'yxatdan o'tilyapti..." : "Ro'yxatdan o'tish"}
				</Button>
			</form>
			<p className="text-center text-sm text-muted-foreground mt-4">
				Hisobingiz bormi? 
				<button 
					type="button" 
					className="text-primary hover:underline ml-1"
					onClick={onShowSignIn}
				>
					Kirish
				</button>
			</p>
		</div>
	);
}


