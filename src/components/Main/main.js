import React from "react"
import './main.css';
import Portal from "../Modal/portal"
import Modal from "../Modal/modal"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            modalIsOpen: false,
            id: null
        };
    }

    openModal = (event) => {
        this.toggleModal();
        this.changeId(event);
    }


    toggleModal = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
    }

    changeId = (e) => {
        const newId = e.target.id
        this.setState({ id: newId });
    }

    componentDidMount() {
        fetch("https://boiling-refuge-66454.herokuapp.com/images")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <>
                    <p className="title">Test app</p>
                    <div className="container">
                        {items.map(item => (
                            <img onClick={this.openModal} className="container-images"
                                key={item.id} id={item.id} src={`${item.url}`} alt="Can't be download" />
                        ))}
                    </div>
                    <footer className="footer">
                        <hr/>
                        <p>© 2018-2019</p>
                    </footer>
                    {this.state.modalIsOpen && <Portal><Modal id={this.state.id} toggle={this.toggleModal} /></Portal>}
                </>
            )
        }
    }
}

export default Main