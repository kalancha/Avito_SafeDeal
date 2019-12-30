import React from 'react';
import './modal.css';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            modalIsOpen: false,
            name: '',
            comment: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }

    handleSubmit(event) {

        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                comment: this.state.comment
            })
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        event.preventDefault();
    }

    componentDidMount() {

        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}`)
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
        const comments = items.comments;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (

                <div className="modal">
                    <form className="modal-form" onSubmit={this.handleSubmit}>
                        <span className="modal-button__close" onClick={() => { this.props.toggle() }}></span>
                        <div className="modal-container">
                            <div className="modal-side__left">
                                <img className="modal-image" src={`${this.state.items.url}`} alt={`${this.state.items}`} />
                                <label className="modal-input">
                                    <input type="text" name="name" placeholder="Ваше имя" onChange={this.handleInputChange} />
                                </label>
                                <label className="modal-input">
                                    <input type="text" name="comment" placeholder="Ваша фамилия" onChange={this.handleInputChange} />
                                </label>
                                <input className="modal-submit" type="submit" value="Оставить комментарий" />
                            </div>
                            <div className="modal-side__right">
                                {comments.map(item => (
                                    <p key={item.id}>{item.text}</p>
                                ))}
                            </div>
                        </div>

                    </form>
                </div>
            )
        }
    }
}

export default Modal