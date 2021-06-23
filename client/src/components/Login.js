import React, {useState} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {login} from '../actions/auth'

function Login({login}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const loginUser = async() => {
        try{
            setErrorMsg("");
            setSuccessMsg("");
            setLoading(true);
            const data = {username, password};
            const res = await axios.post("/admin/login", data, {timeout: 30000});
            login(res.data);
            setLoading(false);

        }catch(err){
            setLoading(false);
            typeof err.response.data === 'object'
            ?setErrorMsg(err.response.data.msg[0].msg)
            :setErrorMsg("Please check your internet connection!")
        }
    }

    return (
        <div class="sufee-login d-flex align-content-center flex-wrap bg-secondary" 
        style={{
            height: "100vh", 
            backgroundImage: "url(/bg-image.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
        <div class="container">
            <div class="login-content">
                <div class="login-form bg-secondary">
                    <h2 className="text-white text-center">Fund Solution NIG LTD</h2>
                    <hr />
                        {
                            successMsg
                            &&<div class="sufee-alert alert with-close alert-success alert-dismissible fade show">
                                <span class="badge badge-pill badge-success">Success {" "}</span>
                                {successMsg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }

                        {
                            errorMsg
                            &&<div class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
                                <span class="badge badge-pill badge-danger">Error {" "}</span>
                                {errorMsg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }
                        <div class="form-group">
                            <label className="text-white">Username</label>
                            <input type="email" class="form-control" placeholder="Username"
                                value={username} onChange={e => setUsername(e.target.value)} required
                            />
                        </div>
                        <div class="form-group">
                            <label className="text-white">Password</label>
                            <input type="password" class="form-control" placeholder="Password"
                                value={password} onChange={e => setPassword(e.target.value)} required
                            />
                        </div>
                        {
                            loading
                            ?<button class="btn btn-dark btn-flat m-b-30 m-t-30 text-bold">Logging in.. </button>
                            :<button class="btn btn-dark btn-flat m-b-30 m-t-30 text-bold" onClick={loginUser}>Log in</button>

                        }
                </div>
            </div>
        </div>
    </div>

    )
}

export default connect(null, {login})(Login)
