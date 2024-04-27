import React, { useState } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';

const Card = (props) => {
    const [count, setCount] = useState(0);
    const updateCount = () => setCount(count + 1);

    return (
        <div className="Card" style={{ borderColor: props.color }}>
            <Link to={'edit/' + props.id}>
                <img className="moreButton" alt="edit button" src={more} />
            </Link>
            <Link to={'/post/' + props.id}>
                {/* Link to the post details page */}
                {props.image_url && (
                    <img src={props.image_url} alt="Post" className="postImage" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                )}
                {/* Displaying the post image */}
            </Link>
            <h2 className="name">Posted by: {props.author}</h2>
            {/* Change props.name to props.author */}
            <h3 className="description"> {props.description}</h3>
            {/* Change props.speed to props.description */}
            <p className="category">Category: {props.category}</p>
            {/* Display category */}
            {props.category === 'listing' && (
                <p className="price">Price: ${props.price}</p>
            )}
            {/* Display price only if category is 'listing' */}
            <button className="betButton" onClick={updateCount}>
                👍 Like Count: {count}
            </button>
        </div>
    );
};

export default Card;
