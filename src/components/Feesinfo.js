import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import {Link, useNavigate, useLocation } from "react-router-dom";
import "./Feesinfo.css";

const Feesinfo = () => {
    const [data, setData] = useState({});
    const[search,setSearch]=useState("");
    const [sortedData, setSortedData] = useState([]);
    const [sort, setSort] = useState(false);
    const[currentPage,setCurrentPage]=useState(0);
    const[pageLimit]=useState(10);
    const[sortFilterValue, setSortFilterValue]=useState("");
    const[operation, setOperation]=useState("");

    const navigate = useNavigate();


    useEffect(() => {
        fireDb.child("students").on("value", (snapshot) => {
            if(snapshot.val()!==null) {
                setData( {...snapshot.val() });
            } else {
                setData({});
            }
        });
        return () => {
            setData({});
        };
    },[]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     navigate(`/search?name=${search}`)
    //     setSearch("");
    // }

    // const renderPagination = () => {
    //     if(data.length < 10 && currentPage === 0) return null;
    //     if(currentPage == 0){
    //         return(
                
    //         );
    // }

    const handleChange = (e) => {
        setSort(true);
        fireDb.child("students").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
            let sortedData = [];
            snapshot.forEach((snap) => {
                sortedData.push(snap.val())
            });
            setSortedData(sortedData);
        });
    };

    const handleReset = () => {
        setSort(false);
        setSearch("");
        fireDb.child("students").on("value", (snapshot) => {
            if(snapshot.val()!==null) {
                setData( {...snapshot.val() });
            } else {
                setData({});
            }
        });
    };

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    // let Search = query.get("fname");
    console.log("search",search);

    const handleSearch = (e) => {
        e.preventDefault();
        fireDb.child("students").orderByChild("fname").equalTo(search).on("value", (snapshot) => {
            if(snapshot.val()) {
                const data= snapshot.val();
                setData(data);
            }
        })
    }

    const handelfilter = (value) => {
        fireDb.child("students").orderByChild("fname").equalTo(value).on("value", (snapshot) => {
            if(snapshot.val()) {
                const data = snapshot.val();
                setData(data);
            }
        });
    };


    return(
        <div style={{marginTop: "100px"}}>
            <div>
                <form style={{
                margin: "auto",
                padding: "15 px",
                maxWidth: "400px",
                alignContent: "center",
                }}
                onSubmit={ handleSearch }>
                    <input 
                    type="text"
                    className='inputField'
                    placeholder='Search Name ...'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    />
                    <span>
                    <button type="submit" className='btn btn-search'
                    style={{
                    alignContent: "center",
                    margin: "auto",
                    }}
                    >
                    Search
                    </button>
                    </span>
                    <span>
                    <button className='btn btn-reset' onClick={()=> handleReset()}
                    style={{
                        alignContent: "right",
                        margin: "auto",
                        }}
                    >
                    Reset
                    </button>
                    </span>
                </form>
                    
                <br/>
            </div>
            <>
            {Object.keys(data).length == 0 ? (
                <h2> NO Data Found: {query.get("fname")} </h2>
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
                {!sort && (
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
                )}
                {sort && (
                    <tbody>
                        {sortedData.map((item, index) => {
                            return(
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{item.fname}</td>
                                <td>{item.lname}</td>
                                <td>{item.appliedcourse}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.fname}</td>
                                <td>{item.fname}</td>
                                <td>{item.fname}</td>
                                <td>{item.fname}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
            )}
            </>
            {/* <div style={{
                margin: "auto",
                padding: "15 px",
                maxWidth: "200px",
                alignContent: "center",
                }}>
                    {renderPagination()}
            </div> */}
            <br/>
            <div>
                <table style={{marginTop: "50px",margin: "auto"}}>
                <tr>
                    <td size="14">
                    <label>Sort By:</label>
                    <select style={{ width: "100%", borderRadius:"2px",height:"35px"}}
                     className='dropdown' name="colValue" onChange={handleChange}>
                        <option>Please Select</option>
                        <option value="fname">First Name</option>
                        <option value="lname">Last Name</option>
                        <option value="courseapplied">Course</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="fname">Fees</option>
                        <option value="fname">Status</option>
                        <option value="fname">Pending Fees</option>
                    </select>
                    </td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td size="8">
                    <label>Filter Status By:</label>
                    <button className='btn btn-complete' onClick={() => handelfilter("Complete")}>
                            Complete
                        </button>
                    <button className='btn btn-Incomplete' onClick={() => handelfilter("InComplete")}>
                            Incomplete
                        </button>
                    </td>
                </tr>
                </table>
            </div>
        </div>
    );

};
 export default Feesinfo;