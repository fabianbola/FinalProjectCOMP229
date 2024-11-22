import { useEffect, useState } from "react";
import { list } from "../datasource/API-Ads";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const ListInventory = () => {

    const navigate = useNavigate();

    let [adList, setAdList] = useState([]); // State variable to hold the list of inventory items
    let [isLoading, setIsLoading] = useState(true);
    let [category, setCategory] = useState('all'); // Correcto

    useEffect(() => {
        // Obtener la URL actual
        const currentPath = window.location.pathname; // Devuelve algo como "/Technology" o "/"
        if(currentPath.split('/').filter(Boolean)){
            setCategory(currentPath.split('/').filter(Boolean).pop());
            console.log('Category:', category);
        } else {
            setCategory('all');
            console.log('Category:', category);

        }

        // Actualizar el estado de categoría
        setCategory(category);

        // Llamar a la API con la categoría
        console.log('Category:', category);
        list(category).then((data) => {
            console.log(data);
            if (data) {
                setAdList(data);
                setIsLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }, []); // Ejecutar solo una vez al montar el componente


/*
    useEffect(() => {
        // const category = 'all';
        console.log('Category:', category);
        list(category).then((data) => {

            console.log(data);
            if (data) {
                setAdList(data);
                setIsLoading(false);
            }
        }).catch(err => {

            alert(err.message);
            console.log(err);
        });
    }, [category]); // Empty array to run only once
*/




    return (
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>Products List</h1>
                <br />
                <br />
                <div className="table-responsive" >
                    {!isLoading &&
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
                                {/* -- Repeatable Template Row -- */}
                                {adList.map((ad, i) => {
                                    return (<tr key={i}>
                                        {console.log(ad)}
                                        <td className="text-center"> {ad.title || ''} </td>
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