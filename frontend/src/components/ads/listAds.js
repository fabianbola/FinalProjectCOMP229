import { useEffect, useState } from "react";
import { listByOwner, listByAdmin,remove, disable } from "../../datasource/API-Ads";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from "../auth/auth-helper";

const ListMyAds = () => {
  const [adsList, setAdsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; // Convert to boolean
  const navigate = useNavigate();

  // Fetch ads based on the selected category
  useEffect(() => {
    const fetchCategory = category === "All" ? "all" : category;

    setAdsList([]);  // Clear previous ads
    setIsLoading(true); // Set loading state to true

    if(!isAdmin){
    listByOwner(fetchCategory).then((data) => {
      if (data) {
        setAdsList(data);
        setIsLoading(false); 
      }
    }).catch((err) => {
      alert(err.message);
      console.error(err);
    });
  }else{
    listByAdmin(fetchCategory).then((data) => {
      if (data) {
        setAdsList(data);
        setIsLoading(false); 
      }
    }).catch((err) => {
      alert(err.message);
      console.error(err);
    });
  }
  }, [category]);

  const handleDisable = async (id) => {
    const confirmDisable = window.confirm("Are you sure you want to disable this ad?");
    
    if (!confirmDisable) return; // Exit if the user cancels
    
    try {
      const data = await disable(id);

      if (data && data.success) {
        alert("Ad disabled successfully.");
        listByOwner(category).then((data) => {
          if (data) {
            setAdsList(data);
          }
        }).catch((err) => {
          alert("Failed to refresh ads list.");
          console.error("Error fetching ads after disabling:", err);
        });
      } else {
        alert(data?.message || "Failed to disable the ad.");
      }
    } catch (err) {
      alert("An error occurred while disabling the ad.");
      console.error("Error details:", err);
    }
  };

  const handleRemove = (id) => {
    if (!isAuthenticated())
        window.alert('You are not authenticated. Please, proceed with sign-in first.')
    else {
        if (window.confirm('Are you sure you want to delete this item?')) {
          // Find the ad's title before removing it
          const adToRemove = adsList.find((ad) => ad.id === id);  
          remove(id).then(data => {
                if (data && data.success) {
                    const newList = adsList.filter((ad) => ad.id !== id);
                    setAdsList(newList);
                    // Show success alert with the ad's title
                    window.alert(`The Ad "${adToRemove.title}" was deleted.`);
                }
                
                else {
                    alert(data.message);
                }
            }).catch(err => {
                alert(err.message);
                console.log(err)
            });
        };
    }
};

  return (
    <main className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <h1>{isAdmin ? "Ads History" : "My Ads"}</h1>

        {/* Filter and Create Ad Button */}
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <label htmlFor="categoryFilter" className="form-label">
              Category Filter:
            </label>
            <select
              id="categoryFilter"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Technology">Technology</option>
              <option value="Home_kitchen">Home kitchen</option>
              <option value="Video_games">Video games</option>
              <option value="Musical_instruments">Musical instruments</option>
            </select>
          </div>
          {!isAdmin && (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/Ads/Create")}
            >
            + Create Ad
            </button>
          </div>
          )}
        </div>

        <div className="table-responsive mt-4">
          {isLoading && <div>Loading...</div>}
          {!isLoading && (!adsList || adsList.length === 0) && <div>No ads found.</div>}
          {!isLoading && adsList.length > 0 && (
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Is Active</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adsList.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.title}</td>
                    <td>{ad.isActive ? "Active" : "Inactive"}</td>
                    <td>{ad.category}</td>
                    <td>${ad.price}</td>
                    <td>{new Date(ad.endDate).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-1"
                        type="button"
                        onClick={() => navigate(`/Ads/Details/${ad.id}`)}
                      >
                        Details
                      </button>
                      
                      {/* Conditional rendering of buttons based on the user's role */}
                      {!isAdmin && (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-1"
                            type="button"
                            onClick={() => navigate(`/Ads/Edit/${ad.id}`)}
                            disabled={!ad.isActive}
                          >
                            Edit
                          </button>

                          {ad.isActive && (
                            <button
                            className="btn btn-warning btn-sm me-1"
                            type="button"
                            onClick={() => handleDisable(ad.id)}
                            >
                            Disable
                            </button>
                          )}

                      {/* Show Disabled button if the ad is not active */}
                      {!ad.isActive && (
                      <button className="btn btn-secondary" disabled>
                      Disabled
                      </button>

                      )}
                      </>
                      )}

                      {isAdmin && (
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => handleRemove(ad.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default ListMyAds;
