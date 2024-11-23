import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createQuestion } from "../../datasource/API-question";

const CreateQuestion = () => {
    const { adID } = useParams(); // Retrieve Ad ID from route
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        question: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleClear = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            question: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to create this question?")) {
            try {
                await createQuestion(adID, formData);
                alert("Question created successfully!");
                navigate(-1); // Return to questions list
            } catch (error) {
                alert("Error occurred. Please fill all required fields.");
            }
        }
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>Create a Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <textarea
                        className="form-control"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
                <button className="btn btn-warning" type="button" onClick={handleClear}>
                    Clear
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>
                    Back
                </button>
            </form>
        </div>
    );
};

export default CreateQuestion;
