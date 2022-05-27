import './index.css';
import { useContext, useRef, useEffect } from 'react';
import { setDimentionsContext } from './index.js';

const Box = (props) => {
    const setDimentions = useContext(setDimentionsContext);
    const ref = useRef(null);

    useEffect(() => {
        setDimentions(values => ({ ...values, [props.num]: [ref.current.offsetLeft,ref.current.offsetTop] }));
    },[ref]);

    return <div ref={ref} id={"cell_" + props.num} className="box number" style={{ backgroundColor: props.background }}>{props.num}</div>
}

export default Box;