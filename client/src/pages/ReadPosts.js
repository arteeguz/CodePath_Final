import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'; 
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('created');

    useEffect(() => {
        const fetchPosts = async () => {
            let { data } = await supabase
                .from('posts')
                .select();

            if (sortBy === 'upvotes') {
                data = data.sort((a, b) => b.upvotes - a.upvotes);
            } else {
                data = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }

            if (searchQuery) {
                data = data.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            setPosts(data);
        };

        fetchPosts();
    }, [searchQuery, sortBy]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="ReadPosts">
            <div className="controls">
                <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by title..." />
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="created">Sort by Created Time</option>
                    <option value="upvotes">Sort by Upvotes Count</option>
                </select>
            </div>
            <div className="posts">
                {posts && posts.length > 0 ?
                    posts.map((post) => 
                        <Card 
                            key={post.id} 
                            id={post.id} 
                            author={post.author} 
                            description={post.description} 
                            category={post.category} 
                            price={post.price} 
                            image_url={post.image_url}
                        />
                    ) : <h2>No posts found.</h2>
                }
            </div>
        </div>  
    );
};

export default ReadPosts;
