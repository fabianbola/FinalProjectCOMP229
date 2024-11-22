import { useEffect, useState } from "react";
import { list } from "../datasource/API-Ads";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const ListInventory = () => {

    const navigate = useNavigate();

    let [adList, setAdList] = useState([]); // State variable to hold the list of inventory items
    let [isLoading, setIsLoading] = useState(true);
    let [category, setcategory] = useState('all');

    useEffect(() => {
        // const category = 'all';
        console.log('Category:', category);
        list(category).then((data) => {
            console.log('entra');

            console.log(data);
            if (data) {
                setAdList(data);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log('no entra');

            alert(err.message);
            console.log(err);
        });
    }, [category]); // Empty array to run only once

    return (
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>Products List</h1>
                <br />
                <br />
                <div className="table-responsive" >
                    {isLoading && <div>Loading...</div>}
                    {!isLoading &&
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                {/* -- Header Row-- */}
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
                                {/* -- Repeatable Template Row -- */}
                                {adList.map((ad, i) => {
                                    return (<tr key={i}>
                                        {console.log(ad)}
                                        <td className="text-center"> {ad.title || ''} </td>
                                        <td className="text-center"> {ad.description || ''} </td>
                                        <td className="text-center"> {ad.category || ''} </td>
                                        <td className="text-center"> {ad.price || ''} </td>
                                        <td className="text-center"> {ad.endDate || ''} </td>
                                        <td className="text-center">
                                            <button
                                            className="btn btn-info btn-sm me-1"
                                            onClick={() => navigate(`/Home/Ads/Details/${ad.id}`)}
                                             >
                                            Details
                                            </button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>}
                </div>
            </div >
        </main >)
};

export default ListInventory;