import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        interest: 'I want to try out your services'
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send data to backend
        console.log('Form Submitted:', formData);
        alert('Thanks! We will contact you shortly.');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2 className="text-gradient">Book a Demo</h2>
                <p>See how Stellar can automate your lead intake.</p>

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email (Optional)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>I am interested in...</label>
                        <select name="interest" value={formData.interest} onChange={handleChange}>
                            <option value="I want to try out your services">I want to try out your services</option>
                            <option value="I want to learn more">I want to learn more</option>
                            <option value="I have a specific use case">I have a specific use case</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary full-width">Submit Request</button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
