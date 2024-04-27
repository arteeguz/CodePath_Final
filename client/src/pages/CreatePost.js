// CreatePost.js
import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client.js';

const CreatePost = () => {
    const [post, setPost] = useState({ author: "", description: "", category: "thread", price: 0, image_url: null });
    const [uploading, setUploading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        setUploading(true);
    
        try {
            // Upload file to Supabase storage
            const { data, error } = await supabase.storage.from('listings').upload(file.name, file);
            if (error) {
                throw error;
            }
    
            console.log('Upload response:', data); // Log the data object
            const imageUrl = data.path; // Retrieve the path from the upload response
            // Construct the image URL using the public URL of the storage bucket
            const publicUrl = `https://yamyrkqwwnamalezwryc.supabase.co/storage/v1/object/public/listings/${imageUrl}`;
            setPost(prev => ({ ...prev, image_url: publicUrl }));
        } catch (error) {
            console.error('Error uploading image:', error.message);
        } finally {
            setUploading(false);
        }
    };
    
    const createPost = async (event) => {
        event.preventDefault();
        console.log('Form submitted');
    
        const { data, error } = await supabase
            .from('posts')
            .insert([post]);
    
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Post created successfully');
            window.location = "/";
        }
    };
    

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br/>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={post.description} onChange={handleChange} /><br/>
                <fieldset>
                    <legend>Category</legend>
                    <label>
                        <input type="radio" name="category" value="thread" checked={post.category === 'thread'} onChange={handleChange} />
                        Thread
                    </label>
                    <label>
                        <input type="radio" name="category" value="listing" checked={post.category === 'listing'} onChange={handleChange} />
                        Listing
                    </label>
                </fieldset>
                {post.category === 'listing' && (
                    <>
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" name="price" value={post.price} onChange={handleChange} /><br/>
                        <label htmlFor="image">Upload Image:</label>
                        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} /><br/>
                        {uploading && <p>Uploading image...</p>}
                    </>
                )}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreatePost;

