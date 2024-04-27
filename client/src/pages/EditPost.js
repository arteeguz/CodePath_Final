// EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import './EditPost.css'

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, author: "", description: "", category: "", price: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const { data: postData, error } = await supabase
                .from('posts')
                .select("*")
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error loading post', error);
            } else {
                setPost(postData);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('posts')
            .update({ author: post.author, description: post.description, category: post.category, price: post.price })
            .eq('id', id);

        window.location = "/";
    };

    const deletePost = async () => {
        await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        window.location = "/";
    };

    return (
        <div>
            <form onSubmit={updatePost}>
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br/>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={post.description} onChange={handleChange} /><br/>
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={post.category} onChange={handleChange}>
                    <option value="thread">Thread</option>
                    <option value="listing">Listing</option>
                </select><br/>
                {post.category === 'listing' && (
                    <>
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" name="price" value={post.price} onChange={handleChange} /><br/>
                    </>
                )}
                <input type="submit" value="Submit" />
                <button type="button" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
}

export default EditPost;
