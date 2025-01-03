import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

function Review({ review, onVote, currentUser }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleVote = (type) => {
        if (!currentUser) return;
        onVote(review.id, type);
    };

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="user-info">
                    <img 
                        src={review.userAvatar || '/default-avatar.png'} 
                        alt={review.username} 
                        className="user-avatar"
                    />
                    <span className="username">{review.username}</span>
                </div>
                <div className="review-meta">
                    <span className="review-date">
                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </span>
                    <div className="rating">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                </div>
            </div>

            <div className={`review-content ${isExpanded ? 'expanded' : ''}`}>
                <p>{review.content}</p>
            </div>

            {review.content.length > 300 && (
                <button 
                    className="expand-button"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Show less' : 'Read more'}
                </button>
            )}

            <div className="review-actions">
                <button 
                    className={`vote-button ${review.userVote === 'helpful' ? 'active' : ''}`}
                    onClick={() => handleVote('helpful')}
                >
                    👍 Helpful ({review.helpfulCount})
                </button>
                <button 
                    className={`vote-button ${review.userVote === 'unhelpful' ? 'active' : ''}`}
                    onClick={() => handleVote('unhelpful')}
                >
                    👎 Not Helpful ({review.unhelpfulCount})
                </button>
            </div>
        </div>
    );
}

export default Review;
