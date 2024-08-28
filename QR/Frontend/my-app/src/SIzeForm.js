import React, { useState } from 'react';
import './SizeForm.css';

function SizeForm() {
    const [bodytext, setBodyText] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');

    const isNumeric = (value) => {
        return /^\d+$/.test(value);  // Checks if the value contains only digits
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for empty fields
        if (!bodytext || !height || !width) {
            alert('Please fill in all fields.');
            return;
        }

        // Validation for numerical values
        if (!isNumeric(height) || !isNumeric(width)) {
            alert('Please enter correct values for height and width. They must be numerical.');
            return;
        }

        try {
            const response = await fetch(`https://qrcodegeneratorjava-d8e40aaeb6ec.herokuapp.com/generateQRCode/${bodytext}/${width}/${height}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'QRCode.png');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } else {
                alert('Failed to generate QR Code');
            }
        } catch (error) {
            alert('Failed to fetch: ' + error.message);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1 style={{ textAlign: 'center' }}>QR Code Generator</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Content:
                            <input
                                type="text"
                                value={bodytext}
                                onChange={(e) => setBodyText(e.target.value)}
                                placeholder="Enter content"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Width: (Recommended 300)
                            <input
                                type="text"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                placeholder="Enter width"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Height: (Recommended 300)
                            <input
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Enter height"
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Generate</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SizeForm;



