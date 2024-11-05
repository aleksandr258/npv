import React from "react";
import Table from 'react-bootstrap/Table';



export default class TableProjects extends React.Component{
   render(){
    const {project} = this.props;
    
    return(
            <Table striped bordered hover size="sm" variant="dark">
                   <thead>
                       <tr>
                           <th>#</th>
                           <th>{project.name}</th>
                           <th>Начальные инвестиции</th>
                           <th>Cashflows</th>
                           <th>Ставка дисконтирования</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>{project.id}</td>
                           <td>{project.invest !== null ? project.invest : 'N/A'}</td>
                           <td>{project.cashflows.length > 0 ? project.cashflows.join(', ') : 'N/A'}</td>
                           <td>{project.discountRate !== null ? project.discountRate : 'N/A'}</td>
                       </tr>
                   </tbody>
               </Table>
    )
   }
}