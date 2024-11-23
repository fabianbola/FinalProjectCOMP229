import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readByOwner, readByAdmin } from "../../datasource/API-Ads";
import { isAuthenticated } from "../auth/auth-helper";
import { disable,remove } from "../../datasource/API-Ads"; // Import disable function


const AdDetails = () => {
  const { id } = useParams(); // Get the ad ID from the route params
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const isOwner = isAuthenticated() && !isAdmin;

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        setIsLoading(true);
        console.log(id);
        let data;
        if (isAdmin) {
          data = await readByAdmin(id);
        } else if (isOwner) {
          data = await readByOwner(id);
        } 
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
  }, [id, isAdmin, isOwner]);


  const handleDisable = async () => {
    const confirmDisable = window.confirm("Are you sure you want to disable this ad?");
    
    if (!confirmDisable) return; // Exit if the user cancels
    
    try {
      const data = await disable(id); // Use the `id` from the URL parameter here
  
      if (data && data.success) {
        alert("Ad disabled successfully.");
        // Refresh the ad details after disabling
        const updatedAd = { ...ad, isActive: false }; // Set the ad's status to inactive
        setAd(updatedAd);
      } else {
        alert(data?.message || "Failed to disable the ad.");
      }
    } catch (err) {
      alert("An error occurred while disabling the ad.");
      console.error("Error details:", err);
    }
  };

  const handleRemove = async () => {
    if (!isAuthenticated()) {
      alert("You are not authenticated. Please, proceed with sign-in first.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
    if (!confirmDelete) return;

    try {
      const data = await remove(id);

      if (data && data.success) {
        alert(`The Ad "${ad.title}" was deleted successfully.`);
        navigate(-1); // Navigate back to the previous page or list view
      } else {
        alert(data?.message || "Failed to delete the ad.");
      }
    } catch (err) {
      alert("An error occurred while deleting the ad.");
      console.error("Error details:", err);
    }
  };


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
      <h1>Ad Details</h1>
      <div className="card">
        <div className="card-header">
          <h2>{ad.title}</h2>
        </div>
        <div className="card-body">
          <p><strong>Description:</strong> {ad.description}</p>
          <p><strong>Category:</strong> {ad.category}</p>
          <p><strong>Price:</strong> ${ad.price}</p>
          <p>
            <strong>Status:</strong> {ad.isActive ? "Active" : "Inactive"}
          </p>
          {console.log("Hi")}
          {console.log(isAdmin)}
          {console.log(isAuthenticated())}
        {/* Show User info only for admins */}
        {isAdmin && (
          <p><strong>User:</strong> {ad.userName}</p>
        )}
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
            onClick={() => navigate(`/Ads/Details/${id}/Questions`)} // Assuming you have a route for questions
          >
            Questions
        </button>
          
          {isOwner && (
        <>
            <button
              className="btn btn-primary me-2"
              type="button"
              onClick={() => navigate(`/Ads/Edit/${id}`)}
              disabled={!ad.isActive}
            >
              Edit
            </button>

        {isOwner && ad.isActive && (
            <button
            className="btn btn-danger"
            type="button"
            onClick={handleDisable} // Call the function to disable the ad
            >
            Disable
            </button>
        )}

        {!ad.isActive && (
        <button className="btn btn-secondary" disabled>
          Disabled
        </button>
        )}
        </>

          )}
          {isAdmin && (
            <button
              className="btn btn-danger"
              onClick={handleRemove}
              type="button"
            >
              Delete
            </button>
          )}
        <button
        className="btn btn-secondary me-2"
        onClick={() => navigate(-1)}
        type="button"
        >
        Back
        </button>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
