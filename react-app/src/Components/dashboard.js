import React from "react";
import SideMenu from "./sideMenu";
// import NewComponent from "./NewComponent"; // Ваш второй компонент
import TableProjects from "./table";
import styles from './dashboard.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { First } from "react-bootstrap/esm/PageItem";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                { id: 1, name: 'Проект1', invest: null, cashflows: [], discountRate: null, npv: null},
                { id: 2, name: 'Проект2', invest: null, cashflows: [], discountRate: null , npv: null}
            ],
            showModal: false,
            recomendation: false,

        };
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => {
        const res = this.state.projects.filter(e => e.npv !== null)
        console.log(this.state)
        res.length >= 2 ? this.setState({showModal: true}) : alert("Введите все данные")
    }

    getRecomendation = () => {

        console.log(this.state)
        const maxNPV = this.state.projects.reduce(((acc, current) => acc.npv > current.npv ? acc : current), {npv: -Infinity})
        const equalsMax = this.state.projects.filter(e => e.npv === maxNPV.npv);
        const recNames = equalsMax.map(e => e.name)
        console.log(JSON.stringify(equalsMax, null, 2))
        return equalsMax.length >= 2 ? `Рекомендация выбрать: ${recNames.join(' ')}` : `Рекомендация выбрать: ${recNames.join(' ')}`
    }

    updateNPV = (index, newNPV) => {
        this.setState((prevState) => {
            const updatedProjects = [...prevState.projects];
            updatedProjects[index] = {
                ...updatedProjects[index],  
                npv: newNPV 
            };
            console.log('UpdateNPV', updatedProjects)
            return { projects: updatedProjects };
        });
    };

    addProject = (newProject) => {
        this.setState((prevState) => ({
            projects: [
                ...prevState.projects,
                { id: prevState.projects.length + 1, npv: this.npvCalculator(newProject), ...newProject }
            ]
        }));
        console.log(this.state)
    };

    updateProject = (index, updatedData) => {
        console.log(updatedData)
        this.setState((prevState) => {
            const updatedProjects = [...prevState.projects];
            updatedProjects[index] = { 
                ...updatedProjects[index], 
                ...updatedData,
                cashflows: Array.isArray(updatedData.cashflows) ? updatedData.cashflows : [] // Проверка на массив
            };
            console.log(updatedProjects[index])
            updatedProjects[index].npv = this.npvCalculator(updatedProjects[index])
            return { projects: updatedProjects };
        });
        console.log(this.state)
    }

    handleInputChange = (id, newName) => {
        this.setState((prevState) => ({
            projects: prevState.projects.map((project) =>
                project.id === id ? { ...project, name: newName } : project
            ),
        }));
    };

    onUpdateProjects = (updatedProjects) => {
        this.setState({ projects: updatedProjects });
    };

    cashflowsHandle = (value) => {
        const cash = value.split(' ').map(num => parseFloat(num.trim())).filter(e => !isNaN(e));
        this.setState({cash})
    }

    npvCalculator = (project) => {
        let npv = 0;
        let discountRate = project.discountRate/100;
        console.log(discountRate)
        for (let i = 0; i < project.cashflows.length; i++){
            // let delitel = Math.pow(1 + discountRate), i+1);
            let period = (project.cashflows[i]/Math.pow((1 + discountRate), i+1));
            console.log(project.cashflows[i])
            console.log('npv', period)
            npv+=period
        }
        npv =  Number(npv.toFixed(2)) - project.invest;
        console.log('invest', project.invest)
        return npv
    }

    // getRecomendation = ()

    render() {
        console.log(this.state.projects)
        return (
          <div className={styles.dashboard}>
            {/* Передаем стейт и методы управления в оба компонента */}
            <SideMenu
              projects={this.state.projects}
              addProject={this.addProject}
              onInputChange={this.handleInputChange}
              updateProjects={this.updateProject}
            />
            {/* <NewComponent 
                    projects={this.state.projects}
                    onInputChange={this.handleInputChange}
                /> */}
            <div className={styles.tableProjects}>
              {this.state.projects.map((project) => {
                {
                  console.log(project);
                }
                return <TableProjects 
                key={project.id} 
                project={project}
                // updateNPV={this.updateNPV}
                 />;
              })}
            </div>
            <Button variant="primary" onClick={this.handleShow}>
              Получить Рекомендацию
            </Button>

            <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Рекомендация</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.getRecomendation()}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Закрыть
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    }
}
