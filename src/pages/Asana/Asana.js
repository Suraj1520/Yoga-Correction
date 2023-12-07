import React, { useEffect, useRef, useState } from 'react';
import './Asana.css';
import { useParams } from 'react-router-dom';

const Asana = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [showAsanaImage, setShowAsanaImage] = useState(false); // Toggle to show/hide asana image
    const asanas = [
        {
            id: 1,
            name: 'Padmasana',
            imageUrl: '/Image/pad2.jpg',
        },
        {
            id: 2,
            name: 'Savasana',
            imageUrl: '/Image/sava2.jpg',
        },
        {
            id: 3,
            name: 'Bhujangasana',
            imageUrl: '/Image/bhuj1.avif',
        },
        {
            id: 4,
            name: 'Trikonasana',
            imageUrl: '/Image/trik2.avif',
        },
        {
            id: 5,
            name: 'Janu Sirasana',
            imageUrl: '/Image/janu1.webp',
        },
        {
            id: 6,
            name: 'Tadasana',
            imageUrl: '/Image/tad1.avif',
        },

    ];

    const { id } = useParams();
    console.log("targetId");
    console.log(id);
    const targetAsana = asanas.find(asanas => asanas.id === parseInt(id));
    console.log(targetAsana)


    useEffect(() => {
        return () => {
            // Clean up: Stop the camera stream when the component unmounts
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    const startVideo = async () => {
        try {
            const constraints = { video: true };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
                setStream(newStream);
            }
        } catch (err) {
            console.error('Error accessing the camera:', err);
        }
    };

    const stopVideo = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    return (
        <div className="asana-page">
            <h1>Perform Your Asana</h1>
            <div className="camera-feed">
                <video ref={videoRef} autoPlay playsInline></video>
                {showAsanaImage && (
                    <div className="asana-image-overlay">
                        {/* Display current asana image */}
                        {/* Example: <img src="asana_image_url.jpg" alt="Asana" /> */}
                        <img src={targetAsana.imageUrl} alt={targetAsana.name} />
                        <p>{targetAsana.name}</p>
                    </div>
                )}
            </div>
            <div className="video-controls">
                <button onClick={startVideo}>Start Video</button>
                <button onClick={stopVideo}>Stop Video</button>
                <button onClick={() => setShowAsanaImage(!showAsanaImage)}>
                    Toggle Asana Image
                </button>
            </div>
            <div className="asana-instructions">
                <h2>Asana Instructions</h2>
                {/* Display instructions for the asana */}
            </div>
            <div className="pose-feedback">
                <h2>Pose Feedback</h2>
                {/* Display feedback based on the user's pose */}
            </div>
        </div>
    );

};

export default Asana;