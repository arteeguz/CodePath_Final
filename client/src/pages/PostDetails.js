// PostDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';  
import './PostDetails.css'

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select("*")
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post details:', error);
            } else {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Post: {post.author}</h1>
            <p>Description: {post.description}</p>
            <p>Category: {post.category}</p>
            {post.category === 'listing' && <p>Price: ${post.price}</p>}
        </div>
    );
};

export default PostDetails;
