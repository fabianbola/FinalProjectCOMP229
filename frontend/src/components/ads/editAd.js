import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { read, update } from "../../datasource/API-Ads";
import AdModel from "../../datasource/adModel";
import dayjs from "dayjs";


const EditAd = () => {
    let navigate = useNavigate();
    let { id } = useParams();
    let [ad, setAd] = useState(new AdModel());
    let [categories] = useState(["Technology", "Home & Kitchen", "Videogames", "Musical Instruments"]); 

    // Load ad data when the component mounts
    useEffect(() => {
        read(id).then((response) => {
            if (response) {
                setAd(new AdModel(
                    response.title || "",           // title
                    response.description || "",     // description
                    response.category || "",        // category
                    response.owner || "",           // owner
                    response.userName || "",        // user Name
                    response.price || 0,            // price
                    response.isActive || true,     // isActive
                    new Date(response.startDate).toLocaleDateString("en-CA") || "", // Use 'en-CA' for ISO format
                    new Date(response.endDate).toLocaleDateString("en-CA") || "",   // Use 'en-CA' for ISO format
                    response.message || "",         // message
                    response.created || "",         // created
                    response.updated || "",         // updated
                    response.collection || ""       // collection
                ));
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAd((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleClear = () => {
        setAd(new AdModel());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Log the current ad object to check the values
        console.log("Hi I sent this");
        console.log(ad.price);  // Log the price as it is
        console.log(ad.category);
        console.log(ad.startDate);
        console.log(ad.endDate);
        console.log(ad.id);
    
        // Ensure price is treated as a number
        const price = parseFloat(ad.price);
        console.log("Parsed Price:", price);  // Log the parsed price value
    
        if (isNaN(price) || price <= 0) {
            alert("Price must be a positive number.");
            return;
        }
    
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
    
        let newAd = {
            title: ad.title,
            description: ad.description,
            category: ad.category,
            price: price, // Ensure it's a number
            startDate: (() => {
                let date = new Date(ad.startDate);
                date.setDate(date.getDate() + 1);
                return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            })(),
            endDate: (() => {
                let date = new Date(ad.endDate);
                date.setDate(date.getDate() + 1);
                return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            })()
        };
    
        // Log the new ad object before sending it to the API
        console.log("New Ad Object:", newAd);
    
        // Update the ad
        update(id, newAd)
            .then((response) => {
                console.log("API Response:", response); // Log the API response
                if (response && response.success) {
                    alert("Ad successfully updated!");
                    navigate("/MyUser/Ads");
                } else {
                    alert(response.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log("Error:", err); // Log the error if the request fails
            });
    };
    
    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Edit Ad</h1>

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

export default EditAd;
