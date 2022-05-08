import { Component } from 'react'
import { variables } from '../Variables';

interface IBook {
    id: number,
    title: string,
    year: number,
    genre: string,
    author: string,
}

interface Props {
}

interface State {
    books: IBook[],
    modalTitle: string,
    bookId: number,
    title: string,
    year: number,
    genre: string,
    author: string,
}


export class Book extends Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            books: [],
            modalTitle: "",
            bookId: 0,
            title: "",
            year: 2022,
            genre: "",
            author: "",
        }

        this.changeTitle = this.changeTitle.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.changeAuthor = this.changeAuthor.bind(this);

        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    addClick() {
        this.setState({
            modalTitle: "Новая",
            bookId: 0,
            title: "",
            year: 2022,
            genre: "",
            author: "",
        });
    }

    editClick(book: IBook) {
        this.setState({
            modalTitle: "Редактировать",
            bookId: book.id,
            title: book.title,
            year: book.year,
            genre: book.genre,
            author: book.author,
        });
    }

    createClick() {
        fetch(variables.API_URL + 'books', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title: this.state.title,
                Year: this.state.year,
                Genre: this.state.genre,
                Author: this.state.author,
            })
        })
            .then((result) => {
                this.refresh();
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'books/' + this.state.bookId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.bookId,
                Title: this.state.title,
                Year: this.state.year,
                Genre: this.state.genre,
                Author: this.state.author,
            })
        })
            .then((result) => {
                this.refresh();
            })
    }

    deleteClick(id: number) {
        fetch(variables.API_URL + 'books/' + id,
            {
                method: 'DELETE'
            })
            .then((result) => {
                this.refresh();
            })
    }

    changeTitle(event: any) {
        this.setState({ title: event.target.value });
    }
    changeYear(event: any) {
        this.setState({ year: event.target.value });
    }
    changeGenre(event: any) {
        this.setState({ genre: event.target.value });
    }
    changeAuthor(event: any) {
        this.setState({ author: event.target.value });
    }

    refresh() {
        fetch(variables.API_URL + 'books')
            .then(res => res.json())
            .then(data => {
                this.setState({ books: data })
            })
    }

    render() {
        const {
            books,
            modalTitle,
            bookId,           
        } = this.state;

        return (
            <div className="container-fluid">
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Добавить
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Год</th>
                            <th scope="col">Жанр</th>
                            <th scope="col">Автор</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book =>
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.year}</td>
                                <td>{book.genre}</td>
                                <td>{book.author}</td>
                                <td align="right">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(book)}>Редактировать</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => this.deleteClick(book.id)}>Удалить</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>



                <div className="modal fade" tabIndex={-1} id="exampleModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Название
                                <input className="form-control" value={this.state.title} onChange={this.changeTitle} />
                                Год
                                <input className="form-control" value={this.state.year} onChange={this.changeYear} />
                                Жанр
                                <input className="form-control" value={this.state.genre} onChange={this.changeGenre} />
                                Автор
                                <input className="form-control" value={this.state.author} onChange={this.changeAuthor} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>

                                {bookId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.createClick()}
                                    >Сохранить</button>
                                    : null}

                                {bookId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.updateClick()}
                                    >Обновить</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

