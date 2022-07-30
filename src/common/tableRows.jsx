
function TableRows({rowsData, deleteTableRows, handleChange}) {
     
    return(
        
        rowsData.map((data, index)=>{
            const {link}= data;
            return(
                <tr key={index} className="text-center">
                <td>
                {index+1}
                </td>
                <td>                
               <input type="text" value={link} onChange={(evnt)=>(handleChange(index, evnt))} name="link" className="form-control" placeholder="Enter link"/>
                </td>                
                <td><button className="btn btn-outline-danger" onClick={(evnt)=>(deleteTableRows(index, evnt))}>x</button></td>
            </tr>
            )
        })
   
    )
    
}
export default TableRows;