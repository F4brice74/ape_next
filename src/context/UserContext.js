import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../utils/baseurl';

export const UserContext = createContext(null)

export default ({ children }) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const reloadUser = async () => {

      //test1
      try {
        const response = await axios.get(`${backendUrl}/users/me`,
        {
          withCredentials: true,
          //headers: {'Access-Control-Allow-Origin':'https://apevillardssurthones.fr'},
        })

            .then(response => {
                // Handle success.
                //console.log('Well done!');
            console.log("userLocal from use effect", response.data)
            setUser(response.data)
            })
    }
    catch (error) {
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
             console.log(error.response.data);
             console.log(error.response.status);
             console.log(error.response.headers);
            setError(error.response.message)
           
        }

        else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request)
            setError("un problème avec la requête au serveur est survenue")

        }
        else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
        }
        console.log(error);

    }
//endoftest1

      // try {

      //   const userLocal = await axios({
      //     method: 'GET',
      //     withCredentials: true,
      //     url: `${backendUrl}/users/me`,
      //   })
      //     .then(response => {
      //       console.log("userLocal from use effect", response.data)
      //       setUser(response.data)
      //     })
      //     .catch(error => {
      //       // console.log("error form useeffect", error)
      //     });
      // }
      // catch (err) {
      //   console.log("erreur", err)
      // }




    };
    if (!user) {
      reloadUser()
    }
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}