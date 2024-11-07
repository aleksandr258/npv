import React from "react";
import Table from 'react-bootstrap/Table';



export default class TableProjects extends React.Component{
    // npvCalculator = (project) => {
    //     if (project.cashflows.length !== 0){
    //     let npv = 0;
    //     let discountRate = project.discountRate/100;
    //     console.log(discountRate)
    //     for (let i = 0; i < project.cashflows.length; i++){
    //         // let delitel = Math.pow(1 + discountRate), i+1);
    //         let period = (project.cashflows[i]/Math.pow((1 + discountRate), i+1));
    //         console.log(project.cashflows[i])
    //         console.log('npv', period)
    //         npv+=period
    //     }
    //     npv =  Number(npv.toFixed(2)) - project.invest;
    //     console.log('invest', project.invest)

    //     // this.props.updateNPV(project.id, npv)

        
    //     return npv
    //    }else{
    //     return 'N/A'
    //    }
    //    npvCalculator = (project) => {
    //     // Проверка, изменились ли ключевые данные, требующие пересчёта NPV
    //     const { cashflows, discountRate, invest } = project;
        
    //     // Если отсутствуют данные для расчета, возвращаем "N/A"
    //     if (!cashflows || cashflows.length === 0 || discountRate == null || invest == null) {
    //         return 'N/A';
    //     }
    
    //     let npv = 0;
    //     const rate = discountRate / 100;
        
    //     for (let i = 0; i < cashflows.length; i++) {
    //         npv += cashflows[i] / Math.pow(1 + rate, i + 1);
    //     }
        
    //     npv = Number(npv.toFixed(2)) - invest;
    
    //     // Только если новое значение NPV отличается от текущего, вызываем updateNPV
    //     // if (project.npv !== npv) {
    //     //     this.props.updateNPV(project.id, npv);
    //     // }
    
    //     return npv;
    // }
    
    
   render(){
    const {project} = this.props;
    return(
            <Table striped bordered hover size="sm" variant="dark">
                   <thead>
                       <tr>
                           
                           <th>Название</th>
                           <th>Начальные инвестиции</th>
                           <th>Cashflows</th>
                           <th>Ставка дисконтирования</th>
                           <th>NPV</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>{project.name}</td>
                           <td>{project.invest !== null ? project.invest : 'N/A'}</td>
                           <td>{project.cashflows.length > 0 ? project.cashflows.join(', ') : 'N/A'}</td>
                           <td>{project.discountRate !== null ? project.discountRate : 'N/A'}</td>
                           <td>{project.npv !== null? project.npv : 'N/A'}</td>
                       </tr>
                   </tbody>
               </Table>
    )
   }
}