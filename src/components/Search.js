import React from "react";
import { useEffect,useState } from "react";
import { useLocation, Link } from "react-router-dom";
import fireDb from "../firebase";
import "./Feesinfo.css";



const Search = () => {

    const [data, setData] = useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get("fname");
    console.log("search",search);

    useEffect(() => {
        searchData();
    }, [search] );

    const searchData = () => {
        fireDb.child("students").orderByChild("fname").equalTo(search).on("value", (snapshot) => {
            if(snapshot.val()) {
                const data= snapshot.val();
                setData(data);
            }
        })
    }


    return (
        <>
        <Link to="/feeinfo">
            <button className="btn btn-goback">Back</button>
        </Link>
            {Object.keys(data).length === 0 ? (
                <h2> NO Data Found: {query.get("fname")}</h2>
                ) : (
                    <table className='style-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Sr. No</th>
                        <th style={{textAlign: "center"}}>First Name</th>
                        <th style={{textAlign: "center"}}>Last Name</th>
                        <th style={{textAlign: "center"}}>Course</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Phone</th>
                        <th style={{textAlign: "center"}}>Fees</th>
                        <th style={{textAlign: "center"}}>Status</th>
                        <th style={{textAlign: "center"}}>Pending Fees</th>
                        <th style={{textAlign: "center"}}>Last Transaction</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        //console.log("hello");
                        return(
                            <tr key={id}>
                            <th scope="row">{index+1}</th>
                            <td>{data[id].fname}</td>
                            <td>{data[id].lname}</td>
                            <td>{data[id].appliedcourse}</td>
                            <td>{data[id].email}</td>
                            <td>{data[id].phone}</td>
                            <td>{data[id].fname}</td>
                            <td>{data[id].fname}</td>
                            <td>{data[id].fname}</td>
                            <td>{data[id].fname}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            )}
        </>
    )
}

export default Search;