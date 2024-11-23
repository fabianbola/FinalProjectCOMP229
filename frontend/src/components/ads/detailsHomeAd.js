import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read } from "../../datasource/API-Ads";

const AdDetails = () => {
  const { id } = useParams(); // Get the ad ID from the route params
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        setIsLoading(true);
        console.log(id);
        let data;

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

    fetchAdDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading ad details...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!ad) {
    return <div className="alert alert-warning">Ad not found.</div>;
  }

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
          <p><strong>User:</strong> {ad.owner}</p>
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

export default AdDetails;
