import NavBar from './nav';
import React from 'react';
import axios from 'axios';
import moment from 'moment';


const Home = () => {
    const [username, setUsername] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [repositories, setRepositories] = React.useState([]);
    const [error, setError] = React.useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const show_error = (message) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 2500);
    };

    const find_repo = () => {
        if(username === '') {
            show_error('Please enter a username');
            return;
        }

        setLoading(true);

        axios.get(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                console.log(response);
                setRepositories(response.data);
            })
            .catch((error) => {
                console.log(error.code);
                show_error(`${error.code} - ${error.message}`);
            })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <NavBar />
            <div className="container">
                {error && (<div className="alert alert-danger" role="alert">
                    {error}
                </div>)}
                <label>Enter Your Github Username</label>
                <input className="form-control" type="text" placeholder="Enter your GitHub username" value={username} onChange={onChangeUsername} />
                <button className="btn btn-primary mt-3" onClick={find_repo}><i className="fa fa-paper-plane"></i> Find Repositories</button>
                {loading && (<i class="fa fa-sync fa-spin"></i>)}
                

                {repositories.map((repository, index) => { 
                    return (
                        <div className = "card shadow-lg mt-lg-5" >
                            <div className = "card-header" >
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <img className='mr-3' src={repository.owner.avatar_url} alt={repository.name} style={{height: 30, borderRadius: 30}}/> {repository.name}
                                    </div>
                                    <div className='col-md-6 text-right'>
                                        <a href={repository.url}>Visit Repository</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <p><span className='text-primary'>Description: -</span> {repository.description}</p>
                                <p><span className='text-primary'>File Size: -</span> {repository.size / 1000} MB</p>
                                <p><span className='text-primary'>Visibility: -</span> { repository.visibility}</p>
                            </div>
                            <div className='card-footer'>
                                <p><span className='text-primary'>Created At: -</span> {moment(repository.created_at, 'lll')}</p>
                            </div>
                        </div>
                    )
                })
               }
            </div>
        </div>
    )
}

export default Home;