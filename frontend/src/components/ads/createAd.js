import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "../../datasource/API-Ads";
import AdModel from "../../datasource/adModel";

const CreateAd = () => {
    let navigate = useNavigate();
    let [ad, setAd] = useState(new AdModel());
    let [categories] = useState(["Technology", "Home & Kitchen", "Videogames", "Musical Instruments"]); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAd((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleClear = () => {
        setAd(new AdModel());
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate that startDate is greater than today and endDate is greater than startDate
        const today = new Date();
        if (new Date(ad.startDate) <= today) {
            alert("Start date must be in the future.");
            return;
        }
        if (new Date(ad.endDate) <= new Date(ad.startDate)) {
            alert("End date must be later than the start date.");
            return;
        }

        if (ad.price <= 0) {
            alert("Price must be a positive number.");
            return;
        }

        create(ad)
            .then((response) => {

                console.log(response);
                if (response && response.id) {
                    alert("Ad successfully created with the ID: " + response.id);
                } else {
                    alert(response.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Create a New Ad</h1>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="titleTextField">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titleTextField"
                                placeholder="Enter the Ad Title"
                                name="title"
                                value={ad.title || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />
                        <div className="form-group">
                            <label htmlFor="descriptionTextField">Description</label>
                            <textarea
                                className="form-control"
                                id="descriptionTextField"
                                placeholder="Enter the Ad Description"
                                name="description"
                                value={ad.description || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />
                        <div className="form-group">
                            <label htmlFor="categorySelect">Category</label>
                            <select
                                className="form-control"
                                id="categorySelect"
                                name="category"
                                value={ad.category || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <br />
                        <div className="form-group">
                            <label htmlFor="priceTextField">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="priceTextField"
                                placeholder="Enter the Price"
                                name="price"
                                value={ad.price || ""}
                                onChange={handleChange}
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>

                        <br />
                        <div className="form-group">
                            <label htmlFor="startDatePicker">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="startDatePicker"
                                name="startDate"
                                value={ad.startDate || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />
                        <div className="form-group">
                            <label htmlFor="endDatePicker">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="endDatePicker"
                                name="endDate"
                                value={ad.endDate || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">
                                <i className="fas fa-edit"></i> Submit
                            </button>
                            <button
                                className="btn btn-warning"
                                type="button"
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                            <button
                            className="btn btn-secondary me-2"
                            type="button"
                            onClick={() => navigate(-1)}
                            >
                            Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAd;
