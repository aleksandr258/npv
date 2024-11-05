import React from "react";
import SideMenu from "./sideMenu";
// import NewComponent from "./NewComponent"; // Ваш второй компонент
import TableProjects from "./table";
import styles from './dashboard.module.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                { id: 1, name: 'Проект1', invest: null, cashflows: [], discountRate: null },
                { id: 2, name: 'Проект2', invest: null, cashflows: [], discountRate: null }
            ],
        };
    }

    // Переносим методы управления проектами сюда
    handleAddProject = () => {
        if (this.state.projects.length < 3) {
            this.setState((prevState) => ({
                projects: [
                    ...prevState.projects,
                    { id: prevState.projects.length + 1, name: `Проект${prevState.projects.length + 1}` }
                ]
            }));
        } else {
            alert("Максимальное количество проектов — 3!");
        }
    };
    addProject = (newProject) => {
        this.setState((prevState) => ({
            projects: [
                ...prevState.projects,
                { id: prevState.projects.length + 1, ...newProject }
            ]
        }));
    };

    updateProject = (index, updatedData) => {
        this.setState((prevState) => {
            const updatedProjects = [...prevState.projects];
            updatedProjects[index] = { ...updatedProjects[index], ...updatedData };
            return { projects: updatedProjects };
        });
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

    render() {
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
                {this.state.projects.map(project => {
                    {console.log(project)}
                    return <TableProjects key={project.id} project={project}/>
                })}
                </div>

            </div>
        );
    }
}
