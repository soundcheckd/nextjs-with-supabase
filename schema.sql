-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create concerts table
create table concerts (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    artist text not null,
    venue text not null,
    date timestamp with time zone not null,
    description text,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reviews table
create table reviews (
    id uuid default uuid_generate_v4() primary key,
    concert_id uuid references concerts(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(concert_id, user_id)
);

-- Create ratings table
create table ratings (
    id uuid default uuid_generate_v4() primary key,
    concert_id uuid references concerts(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    rating integer not null check (rating >= 1 and rating <= 5),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(concert_id, user_id)
);

-- Create user_follows table
create table user_follows (
    follower_id uuid references auth.users(id) on delete cascade,
    following_id uuid references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (follower_id, following_id)
);

-- Create RLS policies
alter table concerts enable row level security;
alter table reviews enable row level security;
alter table ratings enable row level security;
alter table user_follows enable row level security;

-- Concerts policies
create policy "Concerts are viewable by everyone"
    on concerts for select
    using (true);

create policy "Authenticated users can create concerts"
    on concerts for insert
    with check (auth.role() = 'authenticated');

-- Reviews policies
create policy "Reviews are viewable by everyone"
    on reviews for select
    using (true);

create policy "Authenticated users can create reviews"
    on reviews for insert
    with check (auth.role() = 'authenticated');

create policy "Users can update their own reviews"
    on reviews for update
    using (auth.uid() = user_id);

create policy "Users can delete their own reviews"
    on reviews for delete
    using (auth.uid() = user_id);

-- Ratings policies
create policy "Ratings are viewable by everyone"
    on ratings for select
    using (true);

create policy "Authenticated users can create ratings"
    on ratings for insert
    with check (auth.role() = 'authenticated');

create policy "Users can update their own ratings"
    on ratings for update
    using (auth.uid() = user_id);

create policy "Users can delete their own ratings"
    on ratings for delete
    using (auth.uid() = user_id);

-- User follows policies
create policy "User follows are viewable by everyone"
    on user_follows for select
    using (true);

create policy "Authenticated users can follow others"
    on user_follows for insert
    with check (auth.role() = 'authenticated');

create policy "Users can unfollow others"
    on user_follows for delete
    using (auth.uid() = follower_id); 