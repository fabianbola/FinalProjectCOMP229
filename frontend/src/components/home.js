import { useEffect, useState } from "react";
import { list } from "../datasource/API-Ads";
import { Link} from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";



const ListInventory = () => {

    const navigate = useNavigate();
    const location = useLocation(); // Hook para detectar cambios en la URL

    let [adList, setAdList] = useState([]); // Lista de anuncios
    let [isLoading, setIsLoading] = useState(true);
    let [category, setCategory] = useState('all'); // Categoría actual

    useEffect(() => {

         // Obtener la categoría desde la URL dinámica
         const currentPath = location.pathname; // Ejemplo: "/Technology" o "/"
 
         const newCategory = decodeURIComponent(currentPath.split('/').filter(Boolean).pop() || 'all');

         if (newCategory !== category) {
            setCategory(newCategory);
            console.log("Category changed to:", newCategory);
        }
    setIsLoading(true);
    list(newCategory).then((data) => {
            console.log("Data fetched for category:", newCategory);
            if (data) {
                setAdList(data);
            }
        })
        .catch((err) => {
            alert("Error fetching data: " + err.message);
            console.error(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [location.pathname]); // Dependencia: Ejecutar cada vez que la URL cambie

    return (
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>Products List</h1>
                <br />
                <br />
                <div className="table-responsive">
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && adList.length === 0 && <div>Unfortunately there is no products in this category</div>}
                    {!isLoading && adList.length > 0 && 
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                {/* -- Header Row-- */}
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Filtrar y mapear los elementos según la categoría */}
                                {adList
                                    .filter((ad) => category === 'all' || ad.category === category) // Filtrar por categoría
                                    .map((ad, i) => (
                                        <tr key={i}>
                                            {console.log(ad)}
                                            <td className="text-center"> {ad.title || ''} </td>
                                            <td className="text-center"> {ad.category || ''} </td>
                                            <td className="text-center"> {ad.price || ''} </td>
                                            <td className="text-center"> {new Date(ad.endDate).toLocaleDateString()}</td>

                                            <td className="text-center">
                                                <button
                                                    className="btn btn-info btn-sm me-1"
                                                    onClick={() => navigate(`/Home/Ads/Details/${ad.id}`)}
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>}
                </div>
            </div>
        </main>
    );
};

export default ListInventory;