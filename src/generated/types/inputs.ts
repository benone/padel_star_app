import { Maybe, InputMaybe, Scalars } from './base';

export type BookingInput = {
  bookingDate: Scalars['ISO8601Date']['input'];
  clubId: Scalars['ID']['input'];
  courtId: Scalars['ID']['input'];
  duration: Scalars['Int']['input'];
  endTime: Scalars['String']['input'];
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  playerId: Scalars['ID']['input'];
  specialInstructions?: InputMaybe<Scalars['String']['input']>;
  sportId: Scalars['ID']['input'];
  startTime: Scalars['String']['input'];
  totalPrice: Scalars['Float']['input'];
};

export type CancelBookingInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type CreateBookingInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  input: BookingInput;
};

export type CreateMatchInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  input: MatchInput;
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  payableId: Scalars['ID']['input'];
  payableType: Scalars['String']['input'];
  paymentMethod: Scalars['String']['input'];
  playerId: Scalars['ID']['input'];
};

export type CreatePlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  input: PlayerInput;
};

export type CreatePostInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  input: PostInput;
};

export type CreateReviewInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  revieweeId: Scalars['ID']['input'];
  revieweeType: Scalars['String']['input'];
  reviewerId: Scalars['ID']['input'];
};

export type DeletePostInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteReviewInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type FollowPlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  followedId: Scalars['ID']['input'];
  followerId: Scalars['ID']['input'];
};

export type JoinMatchInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  matchId: Scalars['ID']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  playerId: Scalars['ID']['input'];
};

export type LeaveMatchInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  matchId: Scalars['ID']['input'];
  playerId: Scalars['ID']['input'];
};

export type LikePostInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  playerId: Scalars['ID']['input'];
  postId: Scalars['ID']['input'];
};

export type LoginPlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogoutPlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

export type MatchInput = {
  bookingId?: InputMaybe<Scalars['ID']['input']>;
  cancellationPolicy?: InputMaybe<Scalars['String']['input']>;
  clubId: Scalars['ID']['input'];
  competitive?: InputMaybe<Scalars['Boolean']['input']>;
  courtBooked?: InputMaybe<Scalars['Boolean']['input']>;
  courtId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  genderPreference?: InputMaybe<Scalars['String']['input']>;
  levelMax?: InputMaybe<Scalars['Float']['input']>;
  levelMin?: InputMaybe<Scalars['Float']['input']>;
  levelName?: InputMaybe<Scalars['String']['input']>;
  matchDate: Scalars['ISO8601DateTime']['input'];
  matchType?: InputMaybe<Scalars['String']['input']>;
  organizerId: Scalars['ID']['input'];
  playersNeeded: Scalars['Int']['input'];
  pricePerPerson?: InputMaybe<Scalars['Float']['input']>;
  sportId: Scalars['ID']['input'];
  totalPlayers: Scalars['Int']['input'];
};

export type PlayerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  level?: InputMaybe<Scalars['Float']['input']>;
  levelName?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  stats?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type PostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  playerId: Scalars['ID']['input'];
  postType: Scalars['String']['input'];
  postableId?: InputMaybe<Scalars['ID']['input']>;
  postableType?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility: Scalars['String']['input'];
};

export type RefreshTokenInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  refreshToken: Scalars['String']['input'];
};

export type RefundPaymentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  paymentId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  refundAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type SendTelegramVerificationCodeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Phone number in international format */
  phoneNumber: Scalars['String']['input'];
};

export type UnfollowPlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  followedId: Scalars['ID']['input'];
  followerId: Scalars['ID']['input'];
};

export type UnlikePostInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  playerId: Scalars['ID']['input'];
  postId: Scalars['ID']['input'];
};

export type UpdateBookingInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  input: BookingInput;
};

export type UpdateMatchInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  input: MatchInput;
};

export type UpdatePlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  input: PlayerInput;
};

export type UpdatePostInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  input: PostInput;
};

export type UpdateReviewInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type VerifyTelegramCodeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Verification code received via Telegram */
  code: Scalars['String']['input'];
  /** Phone number in international format */
  phoneNumber: Scalars['String']['input'];
  /** Optional request ID from send verification */
  requestId?: InputMaybe<Scalars['String']['input']>;
};
