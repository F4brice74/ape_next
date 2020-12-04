import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { backendUrl } from '../../utils/baseurl';


// import material ui 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    button: {
        color: 'white',
        backgroundColor: "#052a77",
        marginTop: '1em',
        '&:hover': {
            backgroundColor: "#224596"
        }
    },

    root: {
        marginLeft: "1em",
        marginRight: "1em",
        marginBottom: "0.5em",
        minWidth: "300px",


        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#224596',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#224596',
            },
        },
    },

});

const Signup = ({ history }) => {
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { user, setUser } = useContext(UserContext)
    //console.log("user", user)
    useEffect(() => {
        if (user) {
           // console.log("user", user)
            history.push('/')
        }
    }, [user])


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`${backendUrl}/auth/local/register`, {
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await response.json()
            //console.log(data)
            if (data.message) {
                //the error return by the server is stored in data.message like below
                setError(data.message[0].messages[0].message)
                return //Stop execution
            }
            setUser(data.user)
            history.push('/')

        } catch (err) {
            setError("une erreur s'est produite en tentant d'accéder au serveur. veuillez ré-éssayer svp")

        }
    }



    return (

        <Grid item container direction="column" justify="center" alignItems="center" className="LoginPage-content">
            <h3>Créez votre compte</h3>
            <form onSubmit={handleSubmit} >
           
                <Grid item xs={12} md={3}>
                    <TextField
                        className={classes.root}
                        id="outlined-basic"
                        variant="outlined"
                        label="Votre identifiant"
                        type="username"
                        name="username"
                        value={username}
                        onChange={(event) => {
                            setError('')
                            setUsername(event.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        className={classes.root}
                        id="outlined-basic"
                        variant="outlined"
                        label="Votre email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => {
                            setError('')
                            setEmail(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        className={classes.root}
                        id="outlined-basic"
                        variant="outlined"
                        label="votre mot de passe"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => {
                            setError('')
                            setPassword(event.target.value)
                        }}
                    />
                </Grid>

                <Button className={classes.button} variant="contained" color="primary" type="submit" value="Send" >
                    S'ENREGISTRER</Button>

            </form>
            {error && <p>{error}</p>}
            <Grid item container className="LoginPage-signup">
            <Grid item xs={12} >
                <h3>vous avez déjà un compte ? connectez-vous </h3>
            </Grid>
            <Grid item xs={12}>
            <a href="/login"><Button className={classes.button} variant="contained" color="primary">connectez-vous</Button></a>
                
            </Grid>
            </Grid>
        </Grid>
    );
}


export default Signup;