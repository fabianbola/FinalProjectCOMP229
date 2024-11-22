import { useEffect, useState } from "react";
import { listByOwner, remove, disable } from "../../datasource/API-Ads";
import { Link } from "react-router-dom";
import { list } from '../../datasource/API-Ads';  // Adjust the path as needed
//import { isAuthenticated } from "../auth/auth-helper";

const ListMyAds = () => {
  const [adsList, setAdsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");

  // Fetch ads based on the selected category
  useEffect(() => {
    const fetchCategory = category === "All" ? "all" : category;

    // Reset adsList to empty and set loading state when category changes
    setAdsList([]);  // Clear previous ads
    setIsLoading(true); // Set loading state to true

    console.log(fetchCategory)

    list(fetchCategory).then((data) => {
            if (data) {
                console.log(data)
                console.log(adsList.length)
                setAdsList(data);
                setIsLoading(false); 
            }
        }).catch((err) => {
            alert(err.message);
            console.error(err);
        });
}, [category]);

//   // Handle removing an ad
//   const handleRemove = (id) => {
//     if (window.confirm("Are you sure you want to delete this ad?")) {
//       remove(id)
//         .then((data) => {
//           if (data && data.success) {
//             setAdsList(adsList.filter((ad) => ad._id !== id));
//           } else {
//             alert(data.message);
//           }
//         })
//         .catch((err) => {
//           alert(err.message);
//           console.error(err);
//         });
//     }
//   };

//   // Handle disabling an ad
//   const handleDisable = (id) => {
//     if (window.confirm("Are you sure you want to disable this ad?")) {
//       disable(id)
//         .then((data) => {
//           if (data && data.success) {
//             list(category); // Refresh ads after disabling
//           } else {
//             alert(data.message);
//           }
//         })
//         .catch((err) => {
//           alert(err.message);
//           console.error(err);
//         });
//     }
//   };

  return (
    <main className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <h1>My Ads</h1>

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
              <option value="Electronics">Electronics</option>
              <option value="Category 2">Category 6</option>
              <option value="Category 3">Category 3</option>
              <option value="Category 4">Category 4</option>
              <option value="Category 5">Category 5</option>
            </select>
          </div>
          <div>
            <Link to="/ads/create" className="btn btn-primary">
              + Create Ad
            </Link>
          </div>
        </div>

        

        <div className="table-responsive mt-4">
          {isLoading && <div>Loading...</div>}
          {!isLoading && (!adsList || adsList.length === 0) && <div>No ads found.</div>}
          {!isLoading && adsList.length > 0 && (
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
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
                    <td>
                      {ad.description.length > 50
                        ? ad.description.substring(0, 50) + "..."
                        : ad.description}
                    </td>
                    <td>{ad.category}</td>
                    <td>${ad.price}</td> 
                    <td>{new Date(ad.endDate).toLocaleDateString()}</td>
                    <td>
                      <Link
                        className="btn btn-info btn-sm me-1"
                        to={`/ads/details/${ad._id}`}
                      >
                        Details
                      </Link>
                      <Link
                        className="btn btn-primary btn-sm me-1"
                        to={`/ads/edit/${ad._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-warning btn-sm me-1"
                        //onClick={() => handleDisable(ad._id)}
                      >
                        Disable
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        //onClick={() => handleRemove(ad._id)}
                      >
                        Delete
                      </button>
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
