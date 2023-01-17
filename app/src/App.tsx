import React, {useEffect, useState} from 'react'
import {RouterProvider} from "react-router-dom";
import {auth} from "./configs/firebase"
import {onAuthStateChanged, User} from "firebase/auth"
import authRouter from "./router/auth.route";
import publicRouter from "./router/public.route";
import {LoadingOverlay} from "@mantine/core";

function App() {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  if (user) {
    return <RouterProvider router={authRouter} />
  }
  if(user === null) {
    return <RouterProvider router={publicRouter} />
  }
  return <LoadingOverlay visible overlayBlur={2} />
}

export default App
