import React from 'react'
import { AxiosResponse } from 'axios'


interface IProps{
    error: AxiosResponse,
    text: string

}

export const ErrorMessage = () => {
    return (
        <div>
            
        </div>
    )
}

export default ErrorMessage