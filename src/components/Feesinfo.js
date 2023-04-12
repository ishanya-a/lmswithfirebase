import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBRow, 
    MDBCol, 
    MDBContainer,
    MDBBtn,
    MDBBtnGroup,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink
} from "mdb-react-ui-kit";
import {useEffect,useState}  from 'react';

const Feesinfo =()=>{

    const[data,setData]=useState([]);
    const[value,setvalue]=useState("");
    const[sortValue,setSortValue]=useState("");
    const[currentPage,setCurrentPage]=useState(0);
    const[pageLimit]=useState(10);
    const[sortFilterValue, setSortFilterValue]=useState("");
    const[operation, setOperation]=useState("");

    const sortOptions = [ "name","id","status","course","pendingfees"];

    useEffect(()=>
    {
        loadUserData(0, 10, 0);
    },[]);

    const loadUserData = async (start, end, increase, optType=null, filterOrSortValue) => {
        switch (optType) {
            case "search":
                setOperation(optType);
                setSortValue("");
                return await axios
                .get(`http://localhost:5000/Students?q=${value}&_start=${start}&_end=${end}`)
                .then((response) => {
                setData(response.data);
                setCurrentPage(currentPage + increase);
            })
            .catch((err) => console.log(err));

            case "sort":
                setOperation(optType);
                setSortFilterValue(filterOrSortValue);
                return await axios
                .get(`http://localhost:5000/Students?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
                .then((response) => {
                setData(response.data);
                setCurrentPage(currentPage + increase);
                })
                .catch((err) => console.log(err));

            case "filter":
                setOperation(optType);
                setSortFilterValue(filterOrSortValue);
                return await axios
                .get(`http://localhost:5000/Students?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
                .then((response) => {
                setData(response.data);
                setCurrentPage(currentPage + increase);
                })
                .catch((err) => console.log(err));

            default:
                return await axios
                .get(`http://localhost:5000/Students?_start=${start}&_end=${end}`)
                .then((response) => {
                setData(response.data);
                setCurrentPage(currentPage + increase);
                })
                .catch((err) => console.log(err));
        }
    };
 
    // console.log("data", data);

    const handleReset =() => {
        setOperation("");
        setvalue("");
        setSortFilterValue("");
        setSortValue("");
        loadUserData(0,10,0);
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        loadUserData(0,10,0,"search");
        // return await axios
        // .get(`http://localhost:5000/Students?q=${value}`)
        // .then((response) => {
        //     setData(response.data);
        //     setvalue("");
        // })
        // .catch((err) => console.log(err));
    };
    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value);
        loadUserData(0,10,0,"sort", value);
        // return await axios
        // .get(`http://localhost:5000/Students?_sort=${value}&_order=asc`)
        // .then((response) => {
        //     setData(response.data);
        // })
        // .catch((err) => console.log(err));
    };
    const handleFilter = async (value) => {
        loadUserData(0,10,0,"filter", value);
        // return await axios
        // .get(`http://localhost:5000/Students?status=${value}`)
        // .then((response) => {
        //     setData(response.data);
        // })
        // .catch((err) => console.log(err));
    };

    const renderPagination = () =>{
        if(data.length < 10 && currentPage ===0) return null;
        if(currentPage == 0){
            return(
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData(10, 20, 1, operation , sortFilterValue)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        }
        else if(currentPage < pageLimit -1 && data.length === pageLimit){
            return(
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData((currentPage-1) * 10, (currentPage) * 10, -1, operation, sortFilterValue)}>Prev
                        
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                    <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData((currentPage + 1) * 10, (currentPage + 2) * 10, 1, operation, sortFilterValue)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }else{
            return(
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUserData((currentPage-1) * 10, (currentPage) * 10, -1, operation,sortFilterValue)}>
                            Prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        }
    };
    return(
        <>
        <MDBContainer>
            <form style={{
                margin: "auto",
                padding: "15 px",
                maxWidth: "400px",
                alignContent: "center",
                }}
                className='d-flex input-group w-auto'
                onSubmit={handleSearch}
                >
                <input
                type="text"
                className='form-control'
                placeholder='search id'
                value={value}
                onChange={(e)=> setvalue(e.target.value)}
                />&nbsp;&nbsp;
                <span>
                {/* <MDBBtnGroup> */}
                    <MDBBtn type="submit" color="dark">
                        Search
                    </MDBBtn>
                    </span>
                    <span>
                    <MDBBtn className='mx-2' color='info' onClick={()=> handleReset()}>
                        Reset
                    </MDBBtn>
                    </span>
                {/* </MDBBtnGroup> */}
            </form>
            <div style={{marginTop: "100px"}}>
                <h2 className='text-center'>Fees Information</h2>
                <MDBRow>
                    <MDBCol size="12">
                        <MDBTable>
                            <MDBTableHead dark>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">COURSE</th>
                                <th scope="col">FEES</th>
                                <th scope="col">STATUS</th>
                                <th scope="col">PENDING FEES</th>
                                <th scope="col">LAST TRANSACTION</th>
                            </tr>
                            </MDBTableHead>
                            {data.length === 0 ? (
                                <MDBTableBody>
                                    <tr>
                                        <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                                    </tr>
                                </MDBTableBody>
                            ):(
                                data.map((item) => (
                                <MDBTableBody key={item.id}>
                                    <tr>
                                    <td>{item.id}</td>
                                    <td >{item.name}</td>
                                    <td >{item.course}</td>
                                    <td >{item.fees}</td>
                                    <td >{item.status}</td>
                                    <td >{item.pendingfees}</td>
                                    <td >{item.lasttransaction}</td>
                                    </tr>
                                </MDBTableBody>
                                ))
                            )}
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
                <div style={{
                margin: "auto",
                padding: "15 px",
                maxWidth: "200px",
                alignContent: "center",
                }}>
                    {renderPagination()}
                </div>
            </div>
            {data.length > 0 && (
                <MDBRow>
                <MDBCol size="8"><h5>Sort By:</h5>
                <select style={{ width: "50%", borderRadius:"2px",height:"35px"}}
                onChange={handleSort}
                value={sortValue}
                >
                    <option>Please Select Value</option>
                    {sortOptions.map((item)=>(
                        <option value={item} key={item.id}>{item}</option>
                    ))}
                </select> 
                </MDBCol>
                <MDBCol size="4"><h5>Filter by Status:</h5>  
                <MDBBtnGroup>
                    <MDBBtn color="sucess" onClick={() => handleFilter("complete")}>Complete</MDBBtn>
                    <MDBBtn color="danger" style={{marginLeft: "2px"}} onClick={() => handleFilter("Incomplete")}>Incomplete</MDBBtn>
                </MDBBtnGroup>
                </MDBCol>
            </MDBRow>
            )}
        </MDBContainer>
        </>
    );
}

export default Feesinfo;