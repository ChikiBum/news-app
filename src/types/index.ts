export type NewsItem = {
	id: string;
	site: string;
	url: string;
	parsed: boolean;
	forced: boolean;
	userId: string;
	createdAt: string;
	updatedAt: string;
};
export type NewsFeed = NewsItem[];

export type GetNewsFilters =
	| Record<string, never>
	| {
			limit: number;
			page: number;
	  };

export type User = {
	id?: string;
	username: string;
	email: string;
	password?: string;
};

export type RegisterResponse = {
	id: string;
	email: string;
	token: string;
};

export type Users = User[];

export type Token = string | null;

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	id: string;
	username: string;
	email: string;
};
export type RegisterRequest = {
	username: string;
	email: string;
	password: string;
};
export type NewsRequest = {
	token: Token;
};

export type GetUsersFilters = {
	limit: number;
	page: number;
};

export type AuthState = {
	isAuthenticated: boolean;
	user: User | null;
	setToken: (token: Token) => void;
	setUser: (user: User) => void;
	logout: () => void;
};

export type RegisterForm = {
	username: string;
	email: string;
	password: string;
	name: string;
};

export type AuthField = {
	name: keyof RegisterForm;
	type: string;
	placeholder: string;
	required?: boolean;
};

export type AuthFormProps = {
	title: string;
	fields: AuthField[];
	values: Partial<RegisterForm>;
	onChange?: <K extends keyof RegisterForm>(
		name: K,
		value: RegisterForm[K],
	) => void;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	submitText: string;
	disabled?: boolean;
	error?: string;
};

declare global {
	interface Window {
		pbjs: {
			que: Array<() => void>;
			onEvent: (eventType: string, callback: (data: unknown) => void) => void;
			setConfig: (config: {
				enableTIDs?: boolean;
				debug?: boolean;
				[key: string]: unknown;
			}) => void;
			addAdUnits: (
				adUnits: Array<{
					code: string;
					mediaTypes: {
						banner?: {
							sizes: Array<[number, number]>;
						};
						video?: Record<string, unknown>;
						native?: Record<string, unknown>;
					};
					bids: Array<{
						bidder: string;
						params: Record<string, unknown>;
					}>;
				}>,
			) => void;
			requestBids: (options: {
				timeout?: number;
				bidsBackHandler?: () => void;
				adUnits?: Array<Record<string, unknown>>;
			}) => void;
			getHighestCpmBids: (adUnitCode?: string) => PrebidBid[];
			renderAd: (doc: Document, adId: string) => void;
			getBidRequests?: () => Array<Record<string, unknown>>;
			getBidResponses?: () => Record<string, PrebidBid[]>;
			getAllWinningBids?: () => PrebidBid[];
			setTargetingForGPTAsync?: (adUnitCode: string) => void;
			[key: string]: unknown;
		};
	}
}

export interface PrebidBid {
	adId: string;
	adUnitCode: string;
	auctionId: string;
	bidder: string;
	bidderCode: string;
	cpm: number;
	creativeId: string;
	currency: string;
	dealId?: string;
	height: number;
	mediaType: "banner" | "video" | "native";
	netRevenue: boolean;
	originalCpm: number;
	originalCurrency: string;
	requestId: string;
	responseTimestamp: number;
	size: string;
	source: string;
	timeToRespond: number;
	ttl: number;
	width: number;
	ad?: string;
	adserverTargeting?: Record<string, string>;
	meta?: {
		advertiserDomains?: string[];
		brandId?: number;
		brandName?: string;
		primaryCatId?: string;
		secondaryCatIds?: string[];
		mediaType?: string;
	};
}

export type AdStatEvent = {
	anonId: string;
	type: AdStatEventType;
	adId?: string;
	meta?: unknown;
	critical?: boolean;
};

export type AdStatEventType =
	| "load_page"
	| "load_ad_module"
	| "auctionInit"
	| "auctionEnd"
	| "bidRequested"
	| "bidResponse"
	| "bidWon"
	| "pageUnload";

export type GridUserSettings = {
	userId: string;
	filters: Record<string, any>;
	visibleColumns: string[];
	sort: { field: string; direction: "asc" | "desc" }[];
	pageSize: number;
	viewName?: string;
	createdAt?: string;
	updatedAt?: string;
};
