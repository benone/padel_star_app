import { Maybe, Scalars } from './base';

export type InputMaybe<T> = Maybe<T>;

export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };

export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */

export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ISO8601Date: { input: string; output: string; }
  ISO8601DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Booking = {
  __typename?: 'Booking';
  bookingDate: Scalars['ISO8601Date']['output'];
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  club: Club;
  clubId: Scalars['ID']['output'];
  confirmationCode: Scalars['String']['output'];
  court: Court;
  courtId: Scalars['ID']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  duration: Scalars['Int']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  match?: Maybe<Match>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentStatus: Scalars['String']['output'];
  payments: Array<Payment>;
  player: Player;
  playerId: Scalars['ID']['output'];
  specialInstructions?: Maybe<Scalars['String']['output']>;
  sport: Sport;
  sportId: Scalars['ID']['output'];
  startTime: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalPrice: Scalars['Float']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Club = {
  __typename?: 'Club';
  amenities?: Maybe<Scalars['JSON']['output']>;
  bookings: Array<Booking>;
  city?: Maybe<Scalars['String']['output']>;
  clubSports: Array<ClubSport>;
  country?: Maybe<Scalars['String']['output']>;
  courts: Array<Court>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imagesUrls: Array<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  matches: Array<Match>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviewCount: Scalars['Int']['output'];
  reviews: Array<Review>;
  sports: Array<Sport>;
  status: Scalars['String']['output'];
  streetAddress?: Maybe<Scalars['String']['output']>;
  telegram?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
  workingHours?: Maybe<Scalars['JSON']['output']>;
};

export type ClubSport = {
  __typename?: 'ClubSport';
  available: Scalars['Boolean']['output'];
  club: Club;
  clubId: Scalars['ID']['output'];
  courts: Array<Court>;
  courtsCount: Scalars['Int']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  pricePerHour: Scalars['Float']['output'];
  sport: Sport;
  sportId: Scalars['ID']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Court = {
  __typename?: 'Court';
  bookings: Array<Booking>;
  club: Club;
  clubId: Scalars['ID']['output'];
  clubSport: ClubSport;
  clubSportId: Scalars['ID']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  indoor: Scalars['Boolean']['output'];
  lighting: Scalars['Boolean']['output'];
  maintenanceNotes?: Maybe<Scalars['String']['output']>;
  matches: Array<Match>;
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  surface?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['ISO8601DateTime']['output'];
  follower: Player;
  followerId: Scalars['ID']['output'];
  following: Player;
  followingId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  likeable: LikeableUnion;
  likeableId: Scalars['ID']['output'];
  likeableType: Scalars['String']['output'];
  player: Player;
  playerId: Scalars['ID']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type LikeableUnion = Post;

/** Autogenerated input type of LoginPlayer */

export type Match = {
  __typename?: 'Match';
  booking?: Maybe<Booking>;
  bookingId?: Maybe<Scalars['ID']['output']>;
  cancellationPolicy?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  club: Club;
  clubId: Scalars['ID']['output'];
  competitive: Scalars['Boolean']['output'];
  court?: Maybe<Court>;
  courtBooked: Scalars['Boolean']['output'];
  courtId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Int']['output'];
  durationPlayed?: Maybe<Scalars['Int']['output']>;
  finalScore?: Maybe<Scalars['String']['output']>;
  genderPreference?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  levelMax?: Maybe<Scalars['Float']['output']>;
  levelMin?: Maybe<Scalars['Float']['output']>;
  levelName?: Maybe<Scalars['String']['output']>;
  matchDate: Scalars['ISO8601DateTime']['output'];
  matchParticipants: Array<MatchParticipant>;
  matchType?: Maybe<Scalars['String']['output']>;
  organizer: Player;
  organizerId: Scalars['ID']['output'];
  participants: Array<Player>;
  payments: Array<Payment>;
  playersNeeded: Scalars['Int']['output'];
  posts: Array<Post>;
  pricePerPerson?: Maybe<Scalars['Float']['output']>;
  sport: Sport;
  sportId: Scalars['ID']['output'];
  spotsAvailable: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  totalPlayers: Scalars['Int']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  winnerTeam?: Maybe<Scalars['String']['output']>;
};

export type MatchParticipant = {
  __typename?: 'MatchParticipant';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  joinMessage?: Maybe<Scalars['String']['output']>;
  match: Match;
  matchId: Scalars['ID']['output'];
  player: Player;
  playerId: Scalars['ID']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type NotifiableUnion = Booking | Match | Payment;


export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['ISO8601DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  expiresAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  notifiable?: Maybe<NotifiableUnion>;
  notifiableId?: Maybe<Scalars['ID']['output']>;
  notifiableType?: Maybe<Scalars['String']['output']>;
  notificationType: Scalars['String']['output'];
  player: Player;
  playerId: Scalars['ID']['output'];
  priority: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  readAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type PayableUnion = Booking | Match;


export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  completedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  currency: Scalars['String']['output'];
  gatewayResponse?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  payable: PayableUnion;
  payableId: Scalars['ID']['output'];
  payableType: Scalars['String']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentType: Scalars['String']['output'];
  player: Player;
  playerId: Scalars['ID']['output'];
  refundAmount?: Maybe<Scalars['Float']['output']>;
  refundReason?: Maybe<Scalars['String']['output']>;
  refundedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  status: Scalars['String']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Player = {
  __typename?: 'Player';
  address?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bookings: Array<Booking>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  email: Scalars['String']['output'];
  followers: Array<Player>;
  following: Array<Player>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  level?: Maybe<Scalars['Float']['output']>;
  levelName?: Maybe<Scalars['String']['output']>;
  likes: Array<Like>;
  longitude?: Maybe<Scalars['Float']['output']>;
  matchParticipants: Array<MatchParticipant>;
  name: Scalars['String']['output'];
  notifications: Array<Notification>;
  organizedMatches: Array<Match>;
  payments: Array<Payment>;
  phone?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  posts: Array<Post>;
  preferences?: Maybe<Scalars['JSON']['output']>;
  reviews: Array<Review>;
  stats?: Maybe<Scalars['JSON']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  likeCount: Scalars['Int']['output'];
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  player: Player;
  playerId: Scalars['ID']['output'];
  postType: Scalars['String']['output'];
  postable?: Maybe<PostableUnion>;
  postableId?: Maybe<Scalars['ID']['output']>;
  postableType?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  visibility: Scalars['String']['output'];
};

export type PostableUnion = Match;


export type Review = {
  __typename?: 'Review';
  club: Club;
  clubId: Scalars['ID']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  helpfulCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  player: Player;
  playerId: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  verified: Scalars['Boolean']['output'];
  visitDate?: Maybe<Scalars['ISO8601Date']['output']>;
};

export type Sport = {
  __typename?: 'Sport';
  active: Scalars['Boolean']['output'];
  bookings: Array<Booking>;
  clubSports: Array<ClubSport>;
  clubs: Array<Club>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  equipment?: Maybe<Scalars['JSON']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  matches: Array<Match>;
  maxPlayers: Scalars['Int']['output'];
  minPlayers: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  popular: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  typicalDuration?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};
