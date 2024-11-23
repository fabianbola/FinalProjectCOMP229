/* 
  File Name: detailsHomeAd.js
  Description: React component that displays the details of a specific advertisement through the home page. 
               The component fetches ad details from the API, handles loading and error states, 
               and displays ad information. It also provides navigation options for related features 
               such as viewing questions related to the ad and a button to go back to the previous page.
  Team's name: BOFC
  Group number: 04
  Date: November 23, 2024
*/

// Importing necessary hooks and functions from React and other modules
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read } from "../../datasource/API-Ads";

// AdDetails Component
const AdDetails = () => {
  const { id } = useParams(); // Retrieve the ad ID from the URL parameters
  const navigate = useNavigate(); // Navigation hook to redirect users
  const [ad, setAd] = useState(null); // State to store the ad details
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store any error messages

  // Fetch ad details using useEffect hook
  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        setIsLoading(true);  // Set loading state to true before fetching data
        console.log(id);
        let data;

        // Fetch ad details from the API using the read function
        data = await read(id);

        if (data && data.success === false) {
          setError(data.message || "Failed to fetch ad details.");
        } else {
          setAd(data);
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching the ad details.");
        console.error(err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAdDetails(); // Call the fetch function when the component mounts
  }, [id]); // Dependency array to re-run the effect if the ad ID changes

  
  // Conditional rendering based on the loading state or error state
  if (isLoading) {
    return <div>Loading ad details...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!ad) {
    return <div className="alert alert-warning">Ad not found.</div>;
  }

   // Render the ad details after successful data fetching
  return (
    <div className="container mt-5">
      <h1>Product Details</h1>
      <div className="card">
        <div className="card-header">
          <h2>{ad.title}</h2>
        </div>
        <div className="card-body">
          <p><strong>Description:</strong> {ad.description}</p>
          <p><strong>Category:</strong> {ad.category}</p>
          <p><strong>Price:</strong> ${ad.price}</p>
          <p><strong>User:</strong> {ad.userName}</p>
          <p>
            <strong>Start Date:</strong> {new Date(ad.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong> {new Date(ad.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Created:</strong> {new Date(ad.created).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Updated:</strong> {new Date(ad.updated).toLocaleDateString()}
          </p>
        </div>
        <div className="card-footer">
          
        <button
            className="btn btn-secondary"
            type="button"
            onClick={() => navigate(`/Home/Ads/Details/${id}/Questions`)} // Assuming you have a route for questions
          >
            Questions
        </button>
        <button
        className="btn btn-secondary me-2"
        type="button"
        onClick={() => navigate(-1)}
        >
        Back
        </button>
        </div>
      </div>
    </div>
  );
};

// Exporting the AdDetails component for use in other parts of the application
export default AdDetails;
