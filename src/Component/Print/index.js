import React,{useContext, useState,useRef,forwardRef} from 'react'

import ReactToPrint, { useReactToPrint } from 'react-to-print';
import './Styles.css'

export default function Print(props) {
    const containerToPrintRef = useRef();

    console.log("props.button",props.button)

    const ContainerToPrint = forwardRef(() => {
        return (
            <div className="print-source" ref={containerToPrintRef}>
                {props.content}
            </div>
        )
    })

    return (
        <div>
            <ReactToPrint
                trigger={() => props.button}
                content={() => containerToPrintRef.current}
            />
            <ContainerToPrint />
        </div>
    )
}
