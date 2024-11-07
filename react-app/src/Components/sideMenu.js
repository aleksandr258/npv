import React from "react";
import styles from './sideMenu.module.css';
import {Button, OverlayTrigger, Tooltip, Form, Modal, ListGroup} from 'react-bootstrap';




export default class SideMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedIndex: null,
            inputValue: ''
        };
    }

    handleShowModal = (index) => {
        this.setState({
            showModal: true,
            selectedIndex: index,
            inputValue: this.props.projects[index].name
        });
    };

    handleCloseModal = () => this.setState({ showModal: false });


    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Добавить новый проект
        </Tooltip>
    );
   
    handleAddProject = () => {
        if (this.props.projects.length < 3) {
            this.setState({
                showModal: true,
                selectedIndex: null, // Устанавливаем в null, чтобы указать, что создается новый проект
                inputValue: ''
            });
        } else {
            alert("Максимальное количество проектов — 3!");
        }
    }
    saveProjectData = (updatedData) => {
        console.log('saveProjectData', updatedData)
        const { selectedIndex } = this.state;
    
        if (selectedIndex === null) {
            // Если selectedIndex равен null, это означает добавление нового проекта
            this.props.addProject(updatedData);
            // this.props.updateProjects(selectedIndex, updatedData);
        } else {
            // Иначе обновляем существующий проект
            this.props.updateProjects(selectedIndex, updatedData);
        }
    
        this.setState({
            showModal: false // Закрываем модальное окно после сохранения
        });
    };

    handleCashflowsChange = (value) => {
        // Разбиваем строку на массив чисел
        const cashflows = value.split(' ').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        this.setState({ cashflows });
    }

    // handleAddProject = () => {
    //     if (this.state.projects.length < 3){
    //         this.setState((prevState) => ({
    //             projects: [...prevState.projects, {id: prevState.projects.length + 1, name: 'Проект3'}]
    //         }))
    //     }else{
    //     alert("Максимальное количество инпутов — 3!");
    //     }
    // }

    handleInputChange = (field, value) => {
        this.setState(prevState => ({
            newProject: { ...prevState.newProject, [field]: value }
        }));
    }

    
    render(){
        return(
            <div className={styles.sideMenu}>
                <ListGroup>
                {this.props.projects.map((project, index) => (
                        <ListGroup.Item as="li" key={project.id} className="d-flex justify-content-between align-items-center">
                            {project.name}
                            <Button variant="outline-primary" size="sm" onClick={() => this.handleShowModal(index)}>
                                Edit
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                 <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}  // Используем метод для рендеринга тултипа
                >
                    <Button variant="success" onClick={this.handleAddProject}>
                        Добавить проект
                    </Button>
                </OverlayTrigger>
                {/* <ul>
                    {this.state.inputs.map(items => <li key={items.id} onChange={this.handleInputChange}>{items.input}</li>)}
                </ul> */}
                <ProjectModal
                    show={this.state.showModal}
                    handleClose={this.handleCloseModal}
                    inputValue={this.state.inputValue}
                    cashflows={this.state.cashflows} 
                    onInputChange={this.handleChange}
                    onSave={this.saveProjectData}
                    onCashflowsChange={this.handleCashflowsChange}
                />

               
            </div>
        )
    }
}



class ProjectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempData: {
                name: props.inputValue || '',
                invest: '',
                discountRate: '',
                cashflows: '',
            }
        };
    }

    // Синхронизируем начальное значение inputValue с tempData.name при открытии модального окна
    componentDidUpdate(prevProps) {
        if (prevProps.inputValue !== this.props.inputValue) {
            this.setState({
                tempData: {
                    ...this.state.tempData,
                    name: this.props.inputValue
                }
            });
        }
    }

    handleChange = (field, value) => {
        this.setState(prevState => ({
            tempData: {
                ...prevState.tempData,
                [field]: value
            }
        }));
        console.log(value)
    };

    handleCashflowsChange = (value) => {
        // Проверяем, что введенные данные являются числом или пробелом

        const isValidInput = /^[0-9\s]*$/.test(value);
        
        if (isValidInput || value === '') { // Если введено число или пустая строка
            this.setState(prevState => ({
                tempData: {
                    ...prevState.tempData,
                    cashflows: value // Обновляем cashflows
                }
            }));
        }
    };

    handleSave = () => {
        const { name, invest, discountRate, cashflows } = this.state.tempData;
        // Проверяем, есть ли cashflows
        if (name === '' && invest === '' && discountRate === '') {
            alert('Пожалуйста, введите все данные');
            return; // Прерываем выполнение, если cashflows пустой
        }
        console.log(this.state.tempData)

        const cash = cashflows.split(' ').map(num => parseFloat(num.trim())).filter(e => !isNaN(e));
        console.log(cash)
        if (cash.length < 5 || cash.length > 8){
            alert('Количество денежных потоков должно быть от 5 до 8')
            return
        }

        // Передаем данные в родительский компонент
        this.props.onSave({ name, invest, discountRate, cashflows: cash}); 
        this.props.handleClose(); // Закрываем модальное окно
    };

    // handleSave = () => {
    //     this.props.onSave(this.state.tempData); // Передаем данные в родительский компонент
    //     this.props.handleClose(); // Закрываем модальное окно
    // };

    render() {
        const { handleClose, show } = this.props;
        const { tempData } = this.state;

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать проект</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formProjectName">
                            <Form.Label>Название проекта</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название"
                                value={tempData.name}
                                onChange={(e) => this.handleChange('name', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInitialInvest">
                            <Form.Label>Начальные инвестиции</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите сумму"
                                value={tempData.invest}
                                onChange={(e) => this.handleChange('invest', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDiscountRate">
                            <Form.Label>Ставка дисконтирования</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите ставку"
                                value={tempData.discountRate}
                                onChange={(e) => this.handleChange('discountRate', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCashflows">
                            <Form.Label>Введите денежные потоки</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={tempData.cashflows}
                                onChange={(e) => this.handleCashflowsChange(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
