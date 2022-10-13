import { useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] =useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    })
    const setValue = value => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
        
    }
return [storedValue, setValue]

}


/* Ejemplo del uso (en este ejemplo text es la key pero puede ser otra cosa)
import { useLocalStorage } from 'path'   el path va a depender de donde esten parados

const [persist, setPersist] = useLocalStorage('text', '')

<input type="text" onChange={e => setPersist(e.target.value)} value={persist}/>
          <h1>{persist}</h1> */